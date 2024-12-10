/** 1. 
 * AES-GCM (Galois/Counter Mode)*/
async function generateAESGCMKey(length) {
    return await crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: length,
        },
        true,
        ["encrypt", "decrypt"]
    );
}

function ivAESGCM(){
    return crypto.getRandomValues(new Uint8Array(12)); 
}

async function encryptAESGCM(key, iv, data) {
    try {
        // console.log(`encryptAESGCM:${key}、${iv}、${data}`)
        const encodedData = new TextEncoder().encode(data);
        console.log(`encryptAESGCM:${key}、${iv}、${encodedData}`)
        const ciphertext = await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv,
            },
            key,
            encodedData
        );
        console.log(`ciphertext:${ciphertext}`)
        return ciphertext;
    } catch (error) {
        console.error("加密失敗：", error);
        setMessages((prev) => [
            ...prev,
            { text: "加密失敗，請檢查輸入！", type: "error" }
        ]);
        return null;
    }
}

async function decryptAESGCM(key, ciphertext, iv) {
    const decryptedData = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        ciphertext
    );
    return new TextDecoder().decode(decryptedData);
}

/** 2. 
 * AES-CBC (Cipher Block Chaining)*/

async function generateAESCBCKey(length) {
    console.log(length)
    return await crypto.subtle.generateKey(
        {
            name: "AES-CBC",
            length: length,
        },
        true,
        ["encrypt", "decrypt"]
    );
}

// CBC需要16字節的IV
function ivAESCBC(){
    return crypto.getRandomValues(new Uint8Array(16)); // CBC需要16字節的IV
}

async function encryptAESCBC(key, iv, data) {
    try{
        const encodedData = new TextEncoder().encode(data);
        const ciphertext = await crypto.subtle.encrypt(
            {
                name: "AES-CBC",
                iv: iv,
            },
            key,
            encodedData
        );
        return ciphertext;
    } catch (error) {
        console.error("加密失敗：", error);
        setMessages((prev) => [
            ...prev,
            { text: "加密失敗，請檢查輸入！", type: "error" }
        ]);
        return null;
    }
}

async function decryptAESCBC(key, ciphertext, iv) {
    const decryptedData = await crypto.subtle.decrypt(
        {
            name: "AES-CBC",
            iv: iv,
        },
        key,
        ciphertext
    );
    return new TextDecoder().decode(decryptedData);
}

/** 3. 
 * AES-CTR (Counter Mode)*/
async function generateAESCTRKey(length) {
    return await crypto.subtle.generateKey(
        {
            name: "AES-CTR",
            length: length,
        },
        true,
        ["encrypt", "decrypt"]
    );
}

// CTR需要16字節的計數器
function ivAESCTR(){
    const counter = new Uint8Array(16); // CTR需要16字節的計數器
    return crypto.getRandomValues(counter);// 隨機生成計數器
}

async function encryptAESCTR(key, iv, data) {
    const encodedData = new TextEncoder().encode(data);
    const ciphertext = await crypto.subtle.encrypt(
        {
            name: "AES-CTR",
            counter: iv,
            length: 64, // 計數器長度（比特）
        },
        key,
        encodedData
    );
    return { ciphertext, iv };
}

async function decryptAESCTR(key, ciphertext, iv) {
    const decryptedData = await crypto.subtle.decrypt(
        {
            name: "AES-CTR",
            counter: iv,
            length: 64,
        },
        key,
        ciphertext
    );
    return new TextDecoder().decode(decryptedData);
}

/** 4. 
 * AES-CFB (Cipher Feedback)*/
async function generateAESCFBKey(length) {
    return await crypto.subtle.generateKey(
        {
            name: "AES-CFB",
            length: length,
        },
        true,
        ["encrypt", "decrypt"]
    );
}

// CFB需要16字節的IV
function ivAESCFB(){
    return crypto.getRandomValues(new Uint8Array(16));
}

async function encryptAESCFB(key, iv, data) {
    const encodedData = new TextEncoder().encode(data);
    const ciphertext = await crypto.subtle.encrypt(
        {
            name: "AES-CFB",
            iv: iv,
            length: 128, // CFB的塊大小（比特）
        },
        key,
        encodedData
    );
    return { ciphertext, iv };
}

async function decryptAESCFB(key, ciphertext, iv) {
    const decryptedData = await crypto.subtle.decrypt(
        {
            name: "AES-CFB",
            iv: iv,
            length: 128,
        },
        key,
        ciphertext
    );
    return new TextDecoder().decode(decryptedData);
}

/** 5. 
 * AES-OFB (Output Feedback) */

async function generateAESOFBKey(length) {
    return await crypto.subtle.generateKey(
        {
            name: "AES-OFB",
            length: length,
        },
        true,
        ["encrypt", "decrypt"]
    );
}

// OFB需要16字節的IV
function ivAESEOF(){
    return crypto.getRandomValues(new Uint8Array(16));
}

async function encryptAESOFB(key, iv, data) {
    const encodedData = new TextEncoder().encode(data);
    const ciphertext = await crypto.subtle.encrypt(
        {
            name: "AES-OFB",
            iv: iv,
            length: 128, // OFB的塊大小（比特）
        },
        key,
        encodedData
    );
    return { ciphertext, iv };
}

async function decryptAESOFB(key, ciphertext, iv) {
    const decryptedData = await crypto.subtle.decrypt(
        {
            name: "AES-OFB",
            iv: iv,
            length: 128,
        },
        key,
        ciphertext
    );
    return new TextDecoder().decode(decryptedData);
}

async function validateIV(ivBase64, mode) {
    try {
        console.log(`ivBase64 1: ${ivBase64}`);
        console.log(`mode 1: ${mode}`);
        
        // Base64 解碼為 Uint8Array
        const ivBuffer = Uint8Array.from(atob(ivBase64), c => c.charCodeAt(0));
        const ivLength = ivBuffer.length;

        console.log(`ivBuffer 2: ${ivBuffer}`);
        console.log(`ivLength 2: ${ivLength}`);

        // 根據模式檢查 IV 長度
        switch (mode) {
            case "AES-CBC":
                if (ivLength !== 16) {
                    return { 
                        valid: false, 
                        message: `IV 必須是 16 字節（128 位），目前是 ${ivLength} 字節。模式：${mode}` 
                    };
                }
                break;
            case "AES-GCM":
                if (ivLength !== 12) {
                    return { 
                        valid: false, 
                        message: `IV 必須是 12 字節（96 位），目前是 ${ivLength} 字節。模式：${mode}` 
                    };
                }
                break;
            default:
                return { 
                    valid: false, 
                    message: `未知加密模式：${mode}` 
                };
        }

        return { valid: true, message: "IV 合法！" ,iv:ivBuffer};
    } catch (error) {
        return { valid: false, message: `無效的 Base64 編碼或輸入錯誤，錯誤信息：${error.message}` };
    }
}

async function stringToKey(base64Key ,mode ,length) {
    const rawKey = base64ToArrayBuffer(base64Key).buffer;
    try{
        const key = await crypto.subtle.importKey(
            "raw", // 格式
            rawKey, // 原始密鑰數據
            {
                name: mode, // 使用的加密算法
                length: length, // 密鑰長度（128、192 或 256 位）
            },
            true, // 是否允許導出密鑰
            ["encrypt", "decrypt"] // 用途：加密和解密
        );
        return {valid: true ,message :key}; // 返回 CryptoKey 對象
    } catch (error) {
        // toastr.error(error.message);
        return {valid: false ,message : error.message};
    }
}

function getAesKeyLength(key) {
    // 確保密鑰是 Uint8Array 或 ArrayBuffer
    if (!(key instanceof Uint8Array) && !(key instanceof ArrayBuffer)) {
        throw new Error("密鑰必須是 Uint8Array 或 ArrayBuffer");
    }

    const keyLength = key.byteLength; // 獲取密鑰的字節長度

    switch (keyLength) {
        case 16:
            return 128;
        case 24:
            return 192;
        case 32:
            return 256;
        default:
            return "無效的 AES 密鑰長度";
    }
}


/** iv to String*/
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


/** key to string */

async function keyToString(key) {
    // 將密鑰導出為 ArrayBuffer
    const rawKey = await crypto.subtle.exportKey("raw", key);
    // 將 ArrayBuffer 轉換為 Base64 字符串
    return arrayBufferToBase64(rawKey);
}


// 將 Base64 字符串轉換為 ArrayBuffer
function base64ToArrayBuffer(base64) {
    try {
        const binaryString = window.atob(base64); // 將 Base64 字符串解碼為二進制字符串
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes; // 返回 Uint8Array
    } catch (error) {
        console.error(error.message);
    }
}