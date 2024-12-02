titleMessage = `閃電與鋼鐵的碰撞，AES 高速加密的無雙神器！`;
common_header(titleMessage ,isHome);

const D_icon = '<i class="fa-solid fa-d"></i>';
const E_icon = '<i class="fa-solid fa-e"></i>';
const list_icon = '<i class="fa-solid fa-list"></i>';
var keySet = '';
var data = '';
var ivSet = ''

var keyStr = '';

var toastr_success_encryptData = `加密成功`;
var toastr_success_decryptData = `解密成功`;
var toastr_warning_keySet = `點選128 / 256 生成密鑰`;
var toastr_warning_encryptDataMessage = `請輸入內容`;
var toastr_warning_decryptDataMessage = `請提供加密字串`;
var toastr_warning_IV = `請提供偏移量iv`;
var toastr_warning_encryptData = `點選 ${E_icon} 進行加密`;
var toastr_warning_decryptData = `點選 ${D_icon} 進行解密`;

const map = new Map();
map.set(`title`,`${key_icon} ${titleMessage}`);
map.set(`common_explain_received`,[`進階加密標準（英語：Advanced Encryption Standard，縮寫：AES），又稱Rijndael加密法（荷蘭語發音：[ˈrɛindaːl]，音似英文的「Rhine doll」），是美國聯邦政府採用的一種區塊加密標準。這個標準用來替代原先的DES，已經被多方分析且廣為全世界所使用。經過五年的甄選流程，進階加密標準由美國國家標準與技術研究院（NIST）於2001年11月26日發佈於FIPS PUB 197，並在2002年5月26日成為有效的標準。現在，進階加密標準已然成為對稱金鑰加密中最流行的演算法之一。`]);
map.set(`common_example_sent`,[``,``]);
map.set(`common_example_received`,[
`encrypt 加密範例<br>
${toastr_warning_keySet}<br>
輸入要加密的內容：123<br>
${toastr_warning_encryptData}<br>
加密後會顯示<br>
密鑰：0lUuXjWvUPNtcDw1rYYQlw==<br>
偏移量：<br>jGsK2uxYqpv3qlUx<br>
加密前：<br>123<br>
加密後：<br>bRP26/CDQLITaPmu5ok/NgY+GQ==<br>`,

`decrypt 解密範例<br>
點選${list_icon} 會顯示當前密鑰、加解密字串、偏移量<br>
${toastr_warning_decryptData}<br>
解密後會顯示<br>
密鑰：0lUuXjWvUPNtcDw1rYYQlw==<br>
偏移量：<br>jGsK2uxYqpv3qlUx<br>
解密前：<br>bRP26/CDQLITaPmu5ok/NgY+GQ==<br>
解密後：<br>123<br>`
]);
map.set(`common_type123_received` ,[`key@@`,`data@@`,`iv@@`]);
initContainer(map ,isHome);

addIcon();
var newKey = null;
async function addIcon(){
    const linkareaDivTag = document.querySelector('.link-area');
    linkareaDivTag.appendChild(document.createElement('br'));
    const lengthArray = [128,256];
    lengthArray.forEach(item =>{
        const iconfunctionATag = document.createElement('a');
        iconfunctionATag.classList.add('icon-link');
        iconfunctionATag.innerHTML = item;
        iconfunctionATag.onclick = async function () {
            const key = await generateKey(item);
            keyStr = await keyToString(key);
            copyMessage = `key length:${item}<br>${keyStr}`
            receivedMessage(copyMessage ,copyMessage.replaceAll('<br>',' '));
            keySet = key;
            // toastr.info(`該功能可生成${item} 長度的key`);
            setTimeout(() => {
                toastr.success(`key已生成`);
            },1000);
        };
        linkareaDivTag.appendChild(iconfunctionATag);
    })

    const icontodofunctionATag = document.createElement('a');
    icontodofunctionATag.classList.add('icon-link');
    icontodofunctionATag.innerHTML = list_icon;
    icontodofunctionATag.onclick = async function () {
        let encryptedData = '';
        let iv = '';
        if(keySet !== ''){
            keyStr = await keyToString(keySet);
        }
        if(data !== ''){
            encryptedData = data;
        }
        if(ivSet !== ''){
            iv = arrayBufferToBase64(ivSet);
        }
        if(keySet === '' && data === '' && ivSet === ''){
            toastr.info(`該功能可顯示當前密鑰、加解密字串、偏移量`);
        }else{
            copyMessage = `密鑰：<br>${keyStr}<br>
                            偏移量：<br>${iv}<br>
                            加解密字串：<br>${encryptedData}
            `;
            receivedMessage(copyMessage ,copyMessage.replaceAll('<br>',''));

            setTimeout(() => {
                toastr.success(`已顯示當前密鑰、加解密字串、偏移量`);
            },1000);
        }
    };
    linkareaDivTag.appendChild(icontodofunctionATag);

    // encryptData decryptData
    // 加密
    const encryptDatafunctionATag = document.createElement('a');
    encryptDatafunctionATag.classList.add('icon-link');
    encryptDatafunctionATag.innerHTML = E_icon;
    encryptDatafunctionATag.onclick = async function () {
        if(keySet === ''){
            toastr.warning(`加密前請先${toastr_warning_keySet}`);
            return;
        }
        if(data === ''){
            toastr.warning(`加密前請先${toastr_warning_encryptDataMessage}`);
            return;
        }
        const { encryptedData, iv } = await encryptData(keySet, data);
        const beforeEncrypt = data;
        data = arrayBufferToBase64(encryptedData);
        ivSet = iv;
        copyMessage = `密鑰：<br>${await keyToString(keySet)}<br>
                    偏移量 iv：<br>${arrayBufferToBase64(iv)}<br>
                    加密前：<br> ${beforeEncrypt}<br>
                    加密後：<br>${arrayBufferToBase64(encryptedData)}<br>`;

        receivedMessage(copyMessage ,copyMessage.replaceAll('<br>',''));
        setTimeout(() => {
            toastr.success(toastr_success_encryptData);
        },1000);
    };
    linkareaDivTag.appendChild(encryptDatafunctionATag);

    // 解密
    const decryptDatafunctionATag = document.createElement('a');
    decryptDatafunctionATag.classList.add('icon-link');
    decryptDatafunctionATag.innerHTML = D_icon;
    decryptDatafunctionATag.onclick = async function () {
        if(keySet === ''){
            toastr.warning(toastr_warning_keySet);
            return;
        }
        if(data === ''){
            toastr.warning(`解密前請先${toastr_warning_decryptDataMessage}`);
            return;
        }
        if(ivSet === ''){
            toastr.warning(`解密前請先${toastr_warning_IV}`);
            return;
        }
        const beforeDecrypt = data;
        const encryptedData = Uint8Array.from(atob(data), c => c.charCodeAt(0)); 
        const decryptedData = await decryptData(keySet, encryptedData, ivSet);
        if(typeof decryptedData !== 'undefined'){
            data = decryptedData;
            copyMessage = `密鑰：<br>${await keyToString(keySet)}<br>
                        偏移量 iv：<br>${arrayBufferToBase64(ivSet)}<br>
                        解密前：<br> ${beforeDecrypt}<br>
                        解密後：<br>${decryptedData}<br>`;

            receivedMessage(copyMessage ,copyMessage.replaceAll('<br>',''));
            setTimeout(() => {
                toastr.success(toastr_success_decryptData);
            },1000);
        }
    };
    linkareaDivTag.appendChild(decryptDatafunctionATag);
}

// 生成隨機密鑰
async function generateKey(generateKeyLength) {
    return await crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: generateKeyLength, // 密鑰長度：128, 192, 或 256
        },
        true, // 是否允許導出密鑰
        ["encrypt", "decrypt"] // 用途：加密和解密
    );
}

async function keyToString(key) {
    // 將密鑰導出為 ArrayBuffer
    const rawKey = await crypto.subtle.exportKey("raw", key);
    // 將 ArrayBuffer 轉換為 Base64 字符串
    return arrayBufferToBase64(rawKey);
}


// 工具函數：ArrayBuffer -> Base64 字符串
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

// 將 Base64 字符串轉換為 ArrayBuffer
function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64); // 將 Base64 字符串解碼為二進制字符串
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes; // 返回 Uint8Array
}

async function stringToKey(base64Key) {
    const rawKey = base64ToArrayBuffer(base64Key).buffer;
    const key = await crypto.subtle.importKey(
        "raw", // 格式
        rawKey, // 原始密鑰數據
        {
            name: "AES-GCM", // 使用的加密算法
            length: 256, // 密鑰長度（128、192 或 256 位）
        },
        true, // 是否允許導出密鑰
        ["encrypt", "decrypt"] // 用途：加密和解密
    );

    return key; // 返回 CryptoKey 對象

}

// 插到回覆框裡面隱藏，複製用
var hiddenElementInteger = 0; 
function hiddenElement(copyMessage ,receivedMessageDivTag){
    const hiddenElementDivTag = document.createElement('div');
    hiddenElementInteger++
    hiddenElementDivTag.classList.add('hidden-element'+hiddenElementInteger);
    hiddenElementDivTag.innerHTML = copyMessage;
    hiddenElementDivTag.style.display = 'none';
    receivedMessageDivTag.appendChild(hiddenElementDivTag);
    receivedMessageDivTag.onclick = function() {
        copyText(copyMessage);
    };
}

var receivedInteger = 0; //回覆訊息copy用
function receivedMessage(messageText ,copyMessage){
    setTimeout(() => {
        const receivedMessageDivTag = document.createElement('div');
        receivedInteger++;
        receivedMessageDivTag.classList.add(class_message, class_received ,class_canCopy+receivedInteger);
        receivedMessageDivTag.innerHTML = messageText;
        chatBody.appendChild(receivedMessageDivTag);
        
        hiddenElement(copyMessage.replace(/[ \t\r]+/g, '') ,receivedMessageDivTag)
        // Scroll to the bottom of the chat body
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

function copyText(item){
    navigator.clipboard.writeText(item)
        .then(() => {
            toastr.success(`Content "${item}" copied to clipboard!`)
        })
        .catch(err => {
            toastr.warning('Failed to copy')
            console.error('Failed to copy: ', err);
        });
}


async function sendMessage() {
    const chatBody = document.getElementById('chatBody');
    // const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (messageText === '') return;

    // Create a new message bubble for the sent message
    const sentMessageDivTag = document.createElement('div');
    sentMessageDivTag.classList.add(class_message, class_sent ,class_usermessage);
    sentMessageDivTag.textContent = messageText;
    chatBody.appendChild(sentMessageDivTag);
    
    if(messageText.includes("key@@") && messageText.split(splitVar)[1] !== ''){
        try{
            keySet = messageText.split(splitVar)[1];
            keySet = await stringToKey(keySet);
            toastr.success(`密鑰長度正確`);
        } catch (error) {
            toastr.error(error.message);
            setTimeout(() => {
                toastr.info(`密鑰長度有誤，請${toastr_warning_keySet}`);
            },1000);
        }
    }else if(messageText.includes("data@@") && messageText.split(splitVar)[1] !== ''){
        const encryptedData = messageText.split(splitVar)[1];
        data = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0)); 
        data = encryptedData;
    }else if(messageText.includes("iv@@") && messageText.split(splitVar)[1] !== ''){
        const iv = messageText.split(splitVar)[1];
        ivSet = base64ToArrayBuffer(iv); 
    }else{
        data = messageText;
    }

    // Scroll to the bottom of the chat body
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Clear the input field
    messageInput.value = '';
}

// 加密
async function encryptData(key, data) {
    const iv = crypto.getRandomValues(new Uint8Array(12)); // 生成隨機 IV（初始化向量）
    const encodedData = new TextEncoder().encode(data); // 編碼成 Uint8Array
    const encrypted = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv, // 必須提供唯一的 IV
        },
        key,
        encodedData
    );
    return { encryptedData: new Uint8Array(encrypted), iv }; // 返回加密數據和 IV
}

// 解密
async function decryptData(key, encryptedData, iv) {
    try {
        const decrypted = await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: iv, // 必須使用相同的 IV
            },
            key,
            encryptedData
        );
        return new TextDecoder().decode(decrypted); // 解碼為字符串
    } catch (error) {
        if (error.name === "OperationError") {
            toastr.warning(`請檢查參數是否正確`);
            console.error("OperationError occurred:", error.message);
        }
        console.error("Encryption error:", error);
        // throw error; // 如果需要處理，這裡可以自定義錯誤行為
    }
}