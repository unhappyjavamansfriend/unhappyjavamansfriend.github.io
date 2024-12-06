const { key, value ,classname } = linkGroup[5];
titleMessage = value[1];
common_header(titleMessage ,isHome);

var generate = '已生成';
var aes_keylength = '密钥长度';
var aes_Plaintext = '明文数据（Plaintext）';
var aes_Key = '密钥（Key）';
var aes_IV = '初始化向量（IV，Initialization Vector）';
var aes_Ciphertext = '密文数据（Ciphertext）';

var toastr_warning_keySet = `點選128 / 256 生成${aes_Key}`;

const map = new Map();
map.set(`emailSubject`,titleMessage);
map.set(`title`,`${key_icon} ${titleMessage}`);
map.set(`common_intro_received`,[`進階加密標準（英語：Advanced Encryption Standard，縮寫：AES），又稱Rijndael加密法（荷蘭語發音：[ˈrɛindaːl]，音似英文的「Rhine doll」），是美國聯邦政府採用的一種區塊加密標準。這個標準用來替代原先的DES，已經被多方分析且廣為全世界所使用。經過五年的甄選流程，進階加密標準由美國國家標準與技術研究院（NIST）於2001年11月26日發佈於FIPS PUB 197，並在2002年5月26日成為有效的標準。現在，進階加密標準已然成為對稱金鑰加密中最流行的演算法之一。`,
    `加密所需的数据<br>
    必需的数据：<br>
    1. 明文数据（Plaintext）：<br>
    
    需要被加密的原始数据，通常是字符串或字节数组。<br>
    2. 密钥（Key）：<br>
    
    用于加密和解密的秘密值。<br>
    AES 密钥长度可以是 128 位、192 位或 256 位（即 16、24 或 32 字节的数组）。<br>
    3. 初始化向量（IV，Initialization Vector）：<br>
    
    用于增加加密随机性，使相同的明文每次加密结果不同。<br>
    通常是随机生成的字节数组。<br>
    不需要保密，但必须确保唯一性，尤其是在模式如 CBC 和 GCM 中。`,
    `解密所需的数据<br>
    必需的数据：<br>
    1. 密文数据（Ciphertext）：<br>
    
    加密后的数据，需要解密还原为明文。<br>
    2. 密钥（Key）：<br>
    
    加密时使用的同一个密钥。<br>
    3. 初始化向量（IV，Initialization Vector）：<br>

    加密时使用的 IV，必须与加密时的值一致。`
]);
map.set(`common_type123_received` ,[`key@@`,`iv@@`,`ciphertext@@`]);
map.set('common_unittest_array1' ,[
    () => sendMessage_unittest([
        {key: 'key' ,value: 'key@@fInrHRV8V55RixvU5Dyzyw=='},
        {key: 'iv' ,value: 'iv@@AvT1LJS2dkjYnXeY'},
        {key: 'plaintext' ,value: '123'},
        {key: 'ciphertext' ,value: ''},
    ] ,'detailmethod'),
    () => setTimeout(() => {
        toastr.info(toastr_warning_encryptData)
    },2000)
])
map.set('common_unittest_array2' ,[
    () => sendMessage_unittest([
        {key: 'key' ,value: 'key@@2iQYGhQT7U2ADVcHW0r4IgolvfT+YJGqD4RfCkYrvmI='},
        {key: 'iv' ,value: 'iv@@QJ1btcOy2KSpoW+7'},
        {key: 'plaintext' ,value: ''},
        {key: 'ciphertext' ,value: 'ciphertext@@dHX7xi+Ii8HRm2QB8pBJdmLo2ALR+A=='},
    ] ,'detailmethod'),
    () => setTimeout(() => {
        toastr.info(toastr_warning_decryptData)
    },2000)
])

map.set('common_operate_received' ,[
`透過圖示生成密鑰與IV<br>
共同步驟：<br>
1. ${toastr_warning_keySet}<br>
2. 點選IV生成${aes_IV}<br>
<br>

加密步驟：<br>
1. 下方輸入要加密的數據接著點選"send"按鈕送出<br>
2. 點選${list_icon} 查看當前數據，輸入的內容應該會顯示在 "${aes_Plaintext}"<br>
3. 點選${toastr_warning_encryptData}<br>
<br>
解密步驟：<br>
1. 下方輸入"ciphertext@@解密的數據"接著點選"send"按鈕送出<br>
2. 點選${list_icon} 查看當前數據，輸入的內容應該會顯示在 "${aes_Ciphertext}"<br>
3. 點選${toastr_warning_decryptData}
`,
`自備密鑰與IV (關鍵詞請點選 ${type123_icon} 複製貼上)<br>
共同步驟：<br>
1. 下方輸入 "key@@你的密鑰"<br>
2. 下方輸入 "iv@@你的IV"<br>
<br>
加密步驟：<br>
1. 下方輸入要加密的數據接著點選"send"按鈕送出<br>
2. 點選${list_icon} 查看當前數據，輸入的內容應該會顯示在 "${aes_Plaintext}"<br>
3. 點選${toastr_warning_encryptData}<br>
<br>
解密步驟：<br>
1. 下方輸入 "ciphertext@@解密的數據" 接著點選"send"按鈕送出<br>
2. 點選${list_icon} 查看當前數據，輸入的內容應該會顯示在 "${aes_Ciphertext}"<br>
3. 點選${toastr_warning_decryptData}`
])

icon_array = [
    [comment_icon ,comment_icon_note] ,
    [operate_icon ,'操作說明'] ,
    [intro_icon ,intro_icon_note] ,
    [`${example_icon}1` ,`加密測試`] ,
    [`${example_icon}2` ,`解密測試`] ,
    [type123_icon ,type_icon_note] ,
    [removeAllMessage_icon ,removeMessage_icon_note] ,
    [email_icon ,email_icon_note],
    ['' ,''],
    ['128' ,`${aes_keylength}128`],
    ['256' ,`${aes_keylength}256`],
    ['IV' ,aes_IV],
    [list_icon ,'當前數據'],
    [E_icon ,'進行AES加密'],
    [D_icon ,'進行AES解密'],
];

function_array = [
    () => common_comment() ,
    () => common_operate(map.get('common_operate_received')) ,
    () => common_intro(map.get('common_intro_received')) ,
    () => common_unittest(map.get('common_unittest_array1')),
    () => common_unittest(map.get('common_unittest_array2')),
    // () => common_example(map.get('common_example_sent') ,map.get('common_example_received')) ,
    () => common_type123(map.get('common_type123_received')) ,
    () => removeAllMessage(),
    (tag) => common_email(map.get('emailSubject'), tag)
]

initContainer(map ,isHome);
addIcon();

var keyObj = '';
var ivObj = ''
var ciphertextObj = '';

// to show on chatbody is str
var keyStr = '';
var ivStr = ''
var plaintextStr = '';
var ciphertextStr = '';

let toastrArray = [
    [aes_Plaintext ,plaintextStr],
    [aes_Ciphertext ,ciphertextStr],
    [aes_Key ,keyStr],
    [aes_IV ,ivStr]
];

function consoleLog(){

    console.log(`--------------------- start`)
    console.log(`keyObj:${keyObj}`)
    console.log(`ivObj:${ivObj}`)
    console.log(`ciphertextObj:${ciphertextObj}`)

    console.log(`---------------------`)
    
    console.log(`keyStr:${keyStr}`)
    console.log(`ivStr:${ivStr}`)
    console.log(`plaintextStr:${plaintextStr}`)
    console.log(`ciphertextStr:${ciphertextStr}`)
    console.log(`--------------------- end`)
}

/**aes basic function start*/

async function generateGCMKey(keyLength) {
    return await crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: keyLength, // 密鑰長度：128, 192, 或 256
        },
        true, // 是否允許導出密鑰
        ["encrypt", "decrypt"] // 用途：加密和解密
    );
}

async function encryptData() {
    try {
        let iv = '';
        if(ivObj === ''){
            iv = crypto.getRandomValues(new Uint8Array(12)); // 生成隨機 IV（初始化向量）
            ivObj = iv;
            ivStr = arrayBufferToBase64(iv);
            setTimeout(() => {
                toastr.success(`${aes_IV}："${ivStr}" ${generate}`);
            },1000);
        }else{
            iv = ivObj;
        }
        console.log(`encryptData ivObj:${ivObj}`)
        console.log(`encryptData ivObj:${iv}`)
        const encodedData = new TextEncoder().encode(plaintextStr); // 編碼成 Uint8Array
        const encrypted = await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv, // 必須提供唯一的 IV
            },
            keyObj,
            encodedData
        );
        return { encryptedData: new Uint8Array(encrypted), iv }; // 返回加密數據和 IV
    } catch (error) {
        if (error.name === "InvalidCharacterError") {
            toastr.warning(`请检查 ${aes_Plaintext} 是否正确`);
        } else {
            console.error("Encryption error:", error.message);
        }
        // 返回一个空对象以防止解构错误
        return {};
    }
}

async function decryptData() {
    try {
        const decrypted = await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: ivObj, // 必須使用相同的 IV
            },
            keyObj,
            ciphertextObj
        );
        return new TextDecoder().decode(decrypted); // 解碼為字符串
    } catch (error) {
        if (error.name === "OperationError") {
            toastr.error(error.message);
            toastr.warning(`請檢查${aes_Ciphertext}、${aes_Key}、${aes_IV}是否正確`);
            console.error(error.message);
        }else if (error.name === "TypeError") {
            toastr.error(error.message);
            // toastr.warning(`請檢查${aes_Ciphertext}、${aes_Key}、${aes_IV}是否正確`);
            console.error(error.message);
        }else{
            console.error("Encryption error:", error);
        }
        // throw error; // 如果需要處理，這裡可以自定義錯誤行為
    }
}

/**trans function start*/

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
function base64ToArrayBuffer(base64 ,type) {
    try {
        const binaryString = window.atob(base64); // 將 Base64 字符串解碼為二進制字符串
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes; // 返回 Uint8Array
    } catch (error) {
        if(type === 'stringToKey'){
            toastr.error(error.message);
            toastr.warning(`請檢查${aes_Key}是否正確`);
        }else{
            if (error.name === "InvalidCharacterError") {
                toastr.error(error.message);
                toastr.warning(`請檢查${aes_IV}是否正確`);
                console.error(error.message);
                return null;
            }  
        }
    }
}

async function stringToKey(base64Key ,type) {
    const rawKey = base64ToArrayBuffer(base64Key ,type).buffer;
    try{
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
    } catch (error) {
        toastr.error(error.message);
        return null;
    }
}

/**message html start*/

async function sendMessage() {
    const chatBody = document.getElementById('chatBody');
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();
    // Clear the input field
    messageInput.value = '';
    
    if (messageText === '') return;
    
    // Create a new message bubble for the sent message
    messageClassArray[1].push(class_usermessage)
    messageSystem(messageText ,messageClassArray[1]);
    messageClassArray[1].pop();

    // Scroll to the bottom of the chat body
    chatBody.scrollTop = chatBody.scrollHeight;
    
    if(messageText.includes("@@") && messageText.split(splitVar).length > 2){
        return null;
    }

    if(keyObj !== '' && plaintextStr !== ''){
        toastr.info(toastr_warning_encryptData);
    }else if(keyObj !== '' && ciphertextObj !== '' && ivObj !== ''){
        toastr.info(toastr_warning_decryptData);
    }

    if(messageText.includes("key@@")){
        keyStr = messageText.split(splitVar)[1];
        toastrArray[2][1] = keyStr;
        if(keyStr === '' || keyStr === null){
            toastr.warning(`缺少${aes_Key}`);
            return;
        }
        keyObj = await stringToKey(keyStr ,'stringToKey');
        if(keyObj === null){ // try catch error throws null
            toastr.info(`${aes_Key}${aes_keylength}有誤，請${toastr_warning_keySet}`);
            return;
        }
        toastr.success(`${aes_Key} 符合`);
        return;
    } 

    if(messageText.includes("ciphertext@@")){
        ciphertextStr = messageText.split(splitVar)[1];
        toastrArray[1][1] = ciphertextStr;
        if(ciphertextStr === ''){
            toastr.warning(`缺少${aes_Ciphertext}`);
            return;
        }
        ciphertextObj = Uint8Array.from(atob(ciphertextStr), c => c.charCodeAt(0)); 
        return;
    }

    if(messageText.includes("iv@@")){
        ivStr = messageText.split(splitVar)[1];
        toastrArray[3][1] = ivStr;
        if(ivStr === '' || ivStr === null){
            toastr.warning(`缺少${aes_IV}`);
            return;
        }
        ivObj = base64ToArrayBuffer(ivStr);
        return;
    }

    plaintextStr = messageText;
    toastrArray[0][1] = plaintextStr;
    consoleLog()
}

/**icon html start*/

function addIcon(){
    const linkareaDivTag = document.querySelector('.link-area');
    linkareaDivTag.appendChild(document.createElement('br'));
    generateKeyIcon(linkareaDivTag);
    generateIVIcon(linkareaDivTag);
    generateDetailIcon(linkareaDivTag);
    generateEncryptIcon(linkareaDivTag);
    generateDecryptIcon(linkareaDivTag);
}

function generateKeyIcon(linkareaDivTag){
    const lengthArray = [128,256];
    lengthArray.forEach(item =>{
        const iconATag = document.createElement('a');
        iconATag.classList.add('icon-link');
        iconATag.innerHTML = item;
        iconATag.onclick = async function () {
            keyObj = await generateGCMKey(item);
            keyStr = await keyToString(keyObj);
            toastrArray[2][1] = keyStr;
            receivedMessage(`${aes_keylength}：<br>${item}<br>key：<br>${keyStr}` ,keyStr);
            setTimeout(() => {
                toastr.success(aes_Key + generate);
            },1000);
            consoleLog()
        };
        linkareaDivTag.appendChild(iconATag);
    })
}

function generateIVIcon(linkareaDivTag){
    const iconATag = document.createElement('a');
    iconATag.classList.add('icon-link');
    iconATag.innerHTML = `IV`;
    iconATag.onclick = function () {
        ivObj = crypto.getRandomValues(new Uint8Array(12));
        ivStr = arrayBufferToBase64(ivObj);
        toastrArray[3][1] = ivStr;

        receivedMessage(`IV：<br>${ivStr}` ,ivStr);
        setTimeout(() => {
            toastr.success(aes_IV + generate);
        },1000);
        consoleLog()
    };
    linkareaDivTag.appendChild(iconATag);
}

function generateDetailIcon(linkareaDivTag){
    const iconATag = document.createElement('a');
    iconATag.classList.add('icon-link' ,'detailmethod');
    iconATag.innerHTML = list_icon;
    iconATag.onclick = function () {
        aesForeach();
        // consoleLog()
    };
    linkareaDivTag.appendChild(iconATag);
}


function aesForeach(isCheckData){
    console.log(`isCheckData:${isCheckData}`)
    if(typeof isCheckData === 'undefined'){
        toastrArray.forEach(item => {
            const key = item[0];
            const value = item[1];
            if(value === ''){
                toastr.warning(`缺少${key}`);
                return;
            }
            receivedMessage(`${key}：<br>${value}` ,value);
        });
        return;
    }
    toastrArray.forEach((item ,index) =>{
        if(isCheckData === 'Encrypt' && index === 1) return;
        if(isCheckData === 'Decrypt' && index === 0) return;
        const key = item[0];
        const value = item[1];
        if(value === ''){
            toastr.warning(`缺少${key}`);
            return null;
        }
    });
}

function generateEncryptIcon(linkareaDivTag){
    const iconATag = document.createElement('a');
    iconATag.classList.add('icon-link' ,'encryptmethod');
    iconATag.innerHTML = E_icon;
    iconATag.onclick = async function () {
        if(aesForeach('Encrypt') === null) return;

        const { encryptedData, iv } = await encryptData();
        ciphertextObj = encryptedData;
        ciphertextStr = arrayBufferToBase64(ciphertextObj);
        toastrArray[1][1] = ciphertextStr;
        ivObj = iv;
        ivStr = arrayBufferToBase64(iv);
        toastrArray[3][1] = ivStr;

        aesForeach();

        setTimeout(() => {
            toastr.success(toastr_success_encryptData);
        },1000);
        consoleLog()
    };
    linkareaDivTag.appendChild(iconATag);
}

function generateDecryptIcon(linkareaDivTag){
    const iconATag = document.createElement('a');
    iconATag.classList.add('icon-link' ,'decryptmethod');
    iconATag.innerHTML = D_icon;
    iconATag.onclick = async function () {
        if(aesForeach('Decrypt') === null) return;

        plaintextStr = await decryptData();
        toastrArray[0][1] = plaintextStr;

        if(typeof plaintextStr !== 'undefined'){
            aesForeach();
            setTimeout(() => {
                toastr.success(toastr_success_decryptData);
            },1000);
            consoleLog()
        }
    };
    linkareaDivTag.appendChild(iconATag);
}

function sendMessage_unittest(testarray ,classname){
    const messageInput = document.getElementById('messageInput');
    testarray.forEach(({key ,value}) =>{
        messageInput.value = value;
        sendMessage();
    })
    consoleLog();
    const icon = document.querySelector(`.${classname}`);
    icon.click();
}

function common_operate(){
    if(!isOperateClicked){
        const array = map.get('common_operate_received');
        array.forEach(item => {
            messageSystem(item);
        })
        isOperateClicked = true;
        toastr.success(toastr_success_operate);
        return;
    }
    toastr.warning(toastr_warning_operate);
}