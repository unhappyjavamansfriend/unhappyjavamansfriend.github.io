const comment1 = { text: "請輸入字符串，我將幫你哈希成SHA-1。", type: "received", isHTML: true };

const pointMessages = [
    { text: `SHA-1 (Secure Hash Algorithm 1)<br>
概念：<br>
SHA-1 是由美國國家安全局（NSA）設計並由美國國家標準技術研究所（NIST）發布的安全散列算法。它能將任意長度的輸入數據轉換為固定長度的 160 位（20 字節）散列值，通常以 40 個十六進制數字表示。<br>
特性：<br>
抗碰撞性：SHA-1 的設計目的是為了防止不同輸入生成相同的散列值，但隨著時間的推移，發現了多種漏洞，使其容易受到碰撞攻擊。<br>
速度：SHA-1 的計算速度較快，但這也使其更容易受到暴力破解攻擊。<br>
安全性問題：由於 SHA-1 的安全性已被質疑，許多組織和標準已經不再推薦使用它。<br>
應用：<br>
SHA-1 曾廣泛應用於數字簽名、SSL/TLS 證書和版本控制系統等領域，但由於其安全性問題，許多應用已轉向使用更安全的哈希算法，如 SHA-256。`,
        type: "received", icon: "fa-solid fa-mug-hot", isHTML: true },
];

const exampleMessages = [
];

const testMessages = [
]

window.SharedContent.resultMethod = (setMessages ,inputMessage ,istest) =>{
    if(istest){
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: inputMessage, type: "sent" }
        ]);
    }

    const sha1Hash = CryptoJS.SHA1(inputMessage).toString();
    setTimeout(() => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: sha1Hash, type: "received cancopy", icon: "fa-solid fa-copy", isHTML: true, copy: sha1Hash}
        ]);
    }, 1000); // 避免同時設置，根據 index 添加延遲
}