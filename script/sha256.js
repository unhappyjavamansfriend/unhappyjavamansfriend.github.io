const comment1 = { text: "請輸入字符串，我將幫你哈希成SHA-256。", type: "received", isHTML: true };

const pointMessages = [
    { text: `SHA-256 (Secure Hash Algorithm 256)<br>
概念：<br>
SHA-256 是 SHA-2 系列中的一種安全散列算法，能生成 256 位（32 字節）的散列值，通常以 64 個十六進制數字表示。它被認為比 SHA-1 更加安全。<br>
特性：<br>
抗碰撞性：SHA-256 提供了更大的散列空間，相比於 SHA-1，對於強行攻擊的抵抗能力更強。<br>
計算性能：雖然 SHA-256 的計算速度比 SHA-1 慢，但它提供了更高的安全性，使其成為許多現代應用的首選哈希算法。<br>
廣泛應用：SHA-256 被廣泛應用於區塊鏈技術（如比特幣）、數字簽名、身份驗證和其他需要高安全性的場景。`,
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
    const sha256Hash = CryptoJS.SHA256(inputMessage).toString();

    setTimeout(() => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: sha256Hash, type: "received cancopy", icon: "fa-solid fa-copy", isHTML: true, copy: sha256Hash}
        ]);
    }, 1000); // 避免同時設置，根據 index 添加延遲
}