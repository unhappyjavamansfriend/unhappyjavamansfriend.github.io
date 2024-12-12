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
    const encodedData = new TextEncoder().encode(data);
    const ciphertext = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        encodedData
    );
    return ciphertext;
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

function validateIV(ivBase64, mode){
    try {
        // Base64 解碼
        const ivBuffer = atob(ivBase64); // 將 Base64 字符串解碼為字節
        const ivLength = ivBuffer.length;

        // 根據模式檢查 IV 長度
        switch (mode) {
            case "AES-CFB":
            case "AES-OFB":
            case "AES-CTR":
            case "AES-CBC":
                if (ivLength !== 16) {
                    return { valid: false, message: `IV 必須是 16 字節（128 位），目前是 ${ivLength} 字節。` };
                }
                break;
            case "AES-GCM":
                if (ivLength !== 12 && ivLength !== 16) {
                    return { valid: false, message: `IV 必須是 12 或 16 字節，目前是 ${ivLength} 字節。` };
                }
                break;
            default:
                return { valid: false, message: `未知加密模式：${mode}` };
        }

        return { valid: true, message: "IV 合法！" };
    } catch (error) {
        return { valid: false, message: "無效的 Base64 編碼。" };
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
