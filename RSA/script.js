titleMessage = `數據的守護者，RSA 非對稱加密的絕對防線！`;
common_header(titleMessage ,isHome);

var rsa_keylength = '密钥长度';
var rsa_Plaintext = '明文数据（Plaintext）';
var rsa_publicKey = '公钥（Public Key）';
var rsa_privateKey = '私钥（Private Key）';
var rsa_Ciphertext = '密文数据（Ciphertext）';

const map = new Map();
map.set(`title`,`${key_icon} ${titleMessage}`);
map.set(`common_explain_received`,[``]);
map.set(`common_example_sent`,[``]);
map.set(`common_example_received`,[``]);
map.set(`common_type123_received` ,[`publicKey@@`,`privateKey@@`]);
initContainer(map ,isHome);
addIcon();

var publicKey = '';
var privateKey = ''
var data = '';

/**rsa basic function start*/
// 生成 RSA 密钥对
async function generateOAEPKeyPair(keyLength) {
    const keyPair = await crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: keyLength, // 密钥长度
            publicExponent: new Uint8Array([1, 0, 1]), // 公钥指数
            hash: { name: "SHA-256" }, // 哈希算法
        },
        true, // 是否允许导出密钥
        ["encrypt", "decrypt"] // 用途
    );

    return keyPair; // 包含公钥和私钥
}

async function encryptData(publicKey, data) {
    const encodedData = new TextEncoder().encode(data); // 将字符串编码为字节数组

    const encryptedData = await crypto.subtle.encrypt(
        {
            name: "RSA-OAEP",
        },
        publicKey, // 使用公钥加密
        encodedData
    );

    return new Uint8Array(encryptedData); // 返回加密结果
}

async function decryptData(privateKey, encryptedData) {
    try{
        const decryptedData = await crypto.subtle.decrypt(
            {
                name: "RSA-OAEP",
            },
            privateKey, // 使用私钥解密
            encryptedData
        );

        return new TextDecoder().decode(decryptedData); // 返回解密后的明文
    } catch (error) {
        if (error.name === "TypeError") {
            toastr.warning(`請檢查${rsa_privateKey}、${rsa_Ciphertext}是否正確`);
            console.error(error.message);
        }
        console.error("Encryption error:", error);
    }
}

/**trans function key to string start*/

// 将 ArrayBuffer 转换为 Base64 字符串
function arrayBufferToBase64(buffer) {
    const binary = String.fromCharCode(...new Uint8Array(buffer));
    return window.btoa(binary);
}

// 将 Base64 转换为 PEM 格式
function base64ToPEM(base64, type) {
    const header = `-----BEGIN ${type}-----\n`;
    const footer = `\n-----END ${type}-----`;
    const body = base64.match(/.{1,64}/g).join("\n"); // 每行最多 64 个字符
    return header + body + footer;
}

// 导出密钥并转换为 PEM 格式
async function exportKeyToPEM(key, type) {
    const exportedKey = await crypto.subtle.exportKey("spki", key); // 导出公钥
    const base64Key = arrayBufferToBase64(exportedKey);
    return base64ToPEM(base64Key, type);
}

async function exportPrivateKeyToPEM(privateKey) {
    const exportedKey = await crypto.subtle.exportKey("pkcs8", privateKey); // 导出私钥
    const base64Key = arrayBufferToBase64(exportedKey);
    return base64ToPEM(base64Key, "PRIVATE KEY");
}

/**trans function string to key start*/
// 将 Base64 字符串转换为 ArrayBuffer
function base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

// 从字符串导入公钥 (SPKI 格式)
async function importPublicKey(base64Key) {
    try{
        const keyBuffer = base64ToArrayBuffer(base64Key);
        return await crypto.subtle.importKey(
            "spki", // 公钥格式
            keyBuffer,
            {
                name: "RSA-OAEP", // 加密算法 (根据实际算法选择)
                hash: "SHA-256",
            },
            true, // 是否可导出
            ["encrypt"] // 公钥用途
        );
    }catch(error){
        if (error.name === "InvalidCharacterError") {
            toastr.warning(`請檢查${rsa_publicKey}是否正確`);
            console.error(error.message);
        }
    }
}

// 从字符串导入私钥 (PKCS8 格式)
async function importPrivateKey(base64Key) {
    try{
        const keyBuffer = base64ToArrayBuffer(base64Key);
        return await crypto.subtle.importKey(
            "pkcs8", // 私钥格式
            keyBuffer,
            {
                name: "RSA-OAEP", // 加密算法 (根据实际算法选择)
                hash: "SHA-256",
            },
            true, // 是否可导出
            ["decrypt"] // 私钥用途
        );
    }catch(error){
        if (error.name === "InvalidCharacterError") {
            toastr.warning(`請檢查${rsa_privateKey}是否正確`);
            console.error(error.message);
        }
    }
}

function extractBase64FromPublicKeyPEM(pem) {
    // if((/-----BEGIN PUBLIC KEY-----/.test(pem) && /-----END PUBLIC KEY-----/.test(pem))
    // ||(/-----BEGINPUBLICKEY-----/.test(pem) && /-----ENDPUBLICKEY-----/.test(pem))
    // ){
    //     return null;
    // }else{
        return pem
        .replace("-----BEGIN PUBLIC KEY-----", "")
        .replace("-----END PUBLIC KEY-----"  , "")
        .replace("-----BEGINPUBLICKEY-----"  , "")
        .replace("-----ENDPUBLICKEY-----"    , "")
        .replace(/\s+/g, "");
    // }
}
function extractBase64FromPrivateKeyPEM(pem) {
    // if((!pem.includes("-----BEGIN PRIVATE KEY-----") && !pem.includes("-----END PRIVATE KEY-----")) 
    // ||(!pem.includes("-----BEGINPRIVATEKEY-----") && !pem.includes("-----ENDPRIVATEKEY-----"))
    // ){
    //     return null;
    // }else{
        return pem
            .replace("-----BEGIN PRIVATE KEY-----", "")
            .replace("-----END PRIVATE KEY-----"  , "")
            .replace("-----BEGINPRIVATEKEY-----"  , "")
            .replace("-----ENDPRIVATEKEY-----"    , "")
            .replace(/\s+/g, "");
    // }
}

// 示例用法
// (async function () {
    
    //     const keyPair = await generateOAEPKeyPair(2048);
    
    //     // 导出公钥和私钥为 PEM 格式
    //     const publicKeyPEM = await exportKeyToPEM(keyPair.publicKey, "PUBLIC KEY");
    //     const privateKeyPEM = await exportPrivateKeyToPEM(keyPair.privateKey);
    
    //     console.log("Public Key:\n", publicKeyPEM);
    //     console.log("Private Key:\n", privateKeyPEM);

//     var key = `-----BEGINPUBLICKEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDANqnykMFY/caACTt7MSwiEFMt
// TYzPaQeucB1EBBSCxMwaZupcyMMRazWYqpP7DCjG443Y7c9/jjjFhtt9QMX/jdp6
// l+D52qnuBvbLu0ENzi6wctI6mKLiUxVYNcyItSbT96QDCdzGl+Ijz2gxVVnUsSL9
// dNSQA5ztbtzH8WELJQIDAQAB
// -----ENDPUBLICKEY-----`;
//     try {
//         key = extractBase64FromPublicKeyPEM(key);
//         const publicKey = await importPublicKey(key);
//         console.log("Imported Public Key:", publicKey);
        
//     } catch (error) {
//         console.error("Error importing public key:", error);
    // }
    // const privateKey = await importPrivateKey(privateKeyBase64);
    // console.log("Imported Private Key:", privateKey);
// })();

/**message html start*/

async function sendMessage() {
    const chatBody = document.getElementById('chatBody');
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (messageText === '') return;

    // Create a new message bubble for the sent message
    const sentMessageDivTag = document.createElement('div');
    sentMessageDivTag.classList.add(class_message, class_sent ,class_usermessage);
    sentMessageDivTag.textContent = messageText;
    chatBody.appendChild(sentMessageDivTag);
    
    if(messageText.includes("publicKey@@") && messageText.split(splitVar)[1] !== ''){
        const keySet = extractBase64FromPublicKeyPEM(messageText.split(splitVar)[1]);
        if(keySet === null){
            toastr.warning(`${rsa_publicKey} 有誤`);
            return;
        }
        console.log(`keySet:${keySet}`)
        const publicKeySet = await importPublicKey(keySet);
        if(publicKey !== publicKeySet){
            publicKey = publicKeySet;
            toastr.warning(`${rsa_publicKey} 已變更`);
        }
        toastr.success(`${rsa_publicKey} 符合`);
    }else if(messageText.includes("privateKey@@") && messageText.split(splitVar)[1] !== ''){
        const keySet = extractBase64FromPrivateKeyPEM(messageText.split(splitVar)[1]);
        if(keySet === null){
            toastr.warning(`${rsa_publicKey} 有誤`);
            return;
        }
        const privateKeySet = importPrivateKey(keySet);
        if(privateKey !== privateKeySet){
            privateKey = privateKeySet;
            toastr.warning(`${rsa_publicKey} 已變更`);
        }
        toastr.success(`${rsa_privateKey} 符合`);
    }else{
        data = messageText;
    }

    // Scroll to the bottom of the chat body
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Clear the input field
    messageInput.value = '';

    if(publicKey !== '' && data !== ''){
        toastr.info(toastr_warning_encryptData);
    }else if(privateKey !== '' && data !== ''){
        toastr.info(toastr_warning_decryptData);
    }
}

/**icon html start*/

async function addIcon(){
    const linkareaDivTag = document.querySelector('.link-area');
    linkareaDivTag.appendChild(document.createElement('br'));
    generateKeyIcon(linkareaDivTag);
    generateDetailIcon(linkareaDivTag);
    generateEncryptIcon(linkareaDivTag);
    generateDecryptIcon(linkareaDivTag);
}

function generateKeyIcon(linkareaDivTag){
    const lengthArray = [1024,2048,4096];
    lengthArray.forEach(item =>{
        const iconATag = document.createElement('a');
        iconATag.classList.add('icon-link');
        iconATag.innerHTML = item;
        iconATag.onclick = async function () {
            const keyPair = await generateOAEPKeyPair(item);
            // 导出公钥和私钥为 PEM 格式
            const publicKeyPEM = await exportKeyToPEM(keyPair.publicKey, "PUBLIC KEY");
            const privateKeyPEM = await exportPrivateKeyToPEM(keyPair.privateKey);
            // console.log("Public Key:\n", publicKeyPEM);
            // console.log("Private Key:\n", privateKeyPEM);
            publicKey = keyPair.publicKey;
            privateKey = keyPair.privateKey;

            // copyMessage = `${rsa_keylength}：<br>${item}<br>
            //                 ${rsa_publicKey}：<br>${publicKeyPEM}<br>
            //                 ${rsa_privateKey}：<br>${privateKeyPEM}`;
            // receivedMessage(copyMessage ,copyMessage);

            copyMessage = `${rsa_publicKey}：<br>${publicKeyPEM}`;
            receivedMessage(copyMessage ,publicKeyPEM);
            copyMessage = `${rsa_privateKey}：<br>${privateKeyPEM}`;
            receivedMessage(copyMessage ,privateKeyPEM);
            setTimeout(() => {
                toastr.success(`${rsa_publicKey}、${rsa_privateKey}已生成`);
            },1000);
        };
        linkareaDivTag.appendChild(iconATag);
    })
}

function generateDetailIcon(linkareaDivTag){
    const iconATag = document.createElement('a');
    iconATag.classList.add('icon-link');
    iconATag.innerHTML = list_icon;
    iconATag.onclick = async function () {
        let publicKeyPEM = '';
        let privateKeyPEM = '';
        if(publicKey === '' && privateKey === '' && data === ''){
            toastr.info(`該功能可顯示當前数据、${rsa_publicKey}、${rsa_privateKey}`);
        }else{
            if(publicKey === ''){
                setTimeout(() => {
                    toastr.warning(`缺少${rsa_publicKey}`);
                },1000);
            }else{
                publicKeyPEM = await exportKeyToPEM(publicKey, "PUBLIC KEY");
            }
            if(privateKey === ''){
                setTimeout(() => {
                    toastr.warning(`缺少${rsa_privateKey}`);
                },1000);
            }else{
                privateKeyPEM = await exportPrivateKeyToPEM(privateKey);
            }
            if(data === ''){
                setTimeout(() => {
                    toastr.warning(`缺少数据`);
                },1000);
            }

            // copyMessage = `数据：<br>${data}<br>
            //                 ${rsa_publicKey}：<br>${publicKeyPEM}<br>
            //                 ${rsa_privateKey}：<br>${privateKeyPEM}
            // `;
            // receivedMessage(copyMessage ,`${publicKeyPEM}<br>${privateKeyPEM}`);
            
            receivedMessageArray([['数据',data],
                [rsa_publicKey ,publicKeyPEM],
                [rsa_privateKey ,privateKeyPEM],
            ])

            setTimeout(() => {
                toastr.success(`已顯示當前数据、${rsa_publicKey}、${rsa_privateKey}`);
            },1000);
        }
    };
    linkareaDivTag.appendChild(iconATag);
}

function generateEncryptIcon(linkareaDivTag){
    const iconATag = document.createElement('a');
    iconATag.classList.add('icon-link');
    iconATag.innerHTML = E_icon;
    iconATag.onclick = async function () {
        if(checkData(false) === null) return;
        
        const beforeEncrypt = data;
        let publicKeyPEM = '';
        let privateKeyPEM = '';
        let encryptedData ='';
        data = await encryptData(publicKey, data)
        encryptedData = arrayBufferToBase64(data);
        publicKeyPEM = await exportKeyToPEM(publicKey, "PUBLIC KEY");
        privateKeyPEM = await exportPrivateKeyToPEM(privateKey);

        // copyMessage = `${rsa_Plaintext}：<br>${beforeEncrypt}<br>
        //                 ${rsa_Ciphertext}：<br>${encryptedData}<br>
        //                 ${rsa_publicKey}：<br>${publicKeyPEM}<br>
        //                 ${rsa_privateKey}：<br>${privateKeyPEM}
        //     `;
        // receivedMessage(copyMessage ,copyMessage);

        receivedMessageArray([[rsa_Plaintext,beforeEncrypt],
            [rsa_Ciphertext ,encryptedData],
            [rsa_publicKey ,publicKeyPEM],
            [rsa_privateKey ,privateKeyPEM],
        ])

        setTimeout(() => {
            toastr.success(toastr_success_encryptData);
        },1000);
    };
    linkareaDivTag.appendChild(iconATag);
}

function generateDecryptIcon(linkareaDivTag){
    const iconATag = document.createElement('a');
    iconATag.classList.add('icon-link');
    iconATag.innerHTML = D_icon;
    iconATag.onclick = async function () {
        if(checkData(true) === null) return;
        
        const beforeDecrypt = arrayBufferToBase64(data);
        let publicKeyPEM = '';
        let privateKeyPEM = '';
        let decryptedData ='';
        decryptedData = await decryptData(privateKey, data)
        if(typeof decryptedData !== 'undefined'){
            publicKeyPEM = await exportKeyToPEM(publicKey, "PUBLIC KEY");
            privateKeyPEM = await exportPrivateKeyToPEM(privateKey);

            // copyMessage = `${rsa_Plaintext}：<br>${beforeDecrypt}<br>
            //                 ${rsa_Ciphertext}：<br>${decryptedData}<br>
            //                 ${rsa_publicKey}：<br>${publicKeyPEM}<br>
            //                 ${rsa_privateKey}：<br>${privateKeyPEM}
            //     `;
            // receivedMessage(copyMessage ,copyMessage);

            receivedMessageArray([
                [rsa_Ciphertext ,beforeDecrypt],
                [rsa_Plaintext ,decryptedData],
                [rsa_publicKey ,publicKeyPEM],
                [rsa_privateKey ,privateKeyPEM],
            ])

            setTimeout(() => {
                toastr.success(toastr_success_decryptData);
            },1000);
        }
    };
    linkareaDivTag.appendChild(iconATag);
}

function checkData(isDecrypt){
    if(isDecrypt){
        if(privateKey === '' && data === ''){
            toastr.warning(`缺少${rsa_privateKey}`);
            toastr.warning(`缺少${rsa_Ciphertext}`);
            return null;
        }else if(privateKey === ''){
            toastr.warning(`缺少${rsa_privateKey}`);
            return null;
        }else if(data === ''){
            toastr.warning(`缺少${rsa_Ciphertext}`);
            return null;
        }
    }else{
        if(publicKey === '' && data === ''){
            toastr.warning(`缺少${rsa_Plaintext}`);
            toastr.warning(`缺少${rsa_publicKey}`);
            return null;
        }else if(publicKey === ''){
            toastr.warning(`缺少${rsa_publicKey}`);
            return null;
        }else if(data === ''){
            toastr.warning(`缺少${rsa_Plaintext}`);
            return null;
        }
    }
}