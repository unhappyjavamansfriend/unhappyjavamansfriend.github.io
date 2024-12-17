const comment1 = { text: "請輸入字符串，我將幫你哈希成MD5(可加鹽)。", type: "received", isHTML: true };

const pointMessages = [
    { text: `MD5訊息摘要演算法（英語：MD5 Message-Digest Algorithm），一種被廣泛使用的密碼雜湊函數，可以產生出一個128位元（16位元組）的散列值（hash value），用於確保信息傳輸完整一致。MD5由羅納德·李維斯特設計，於1992年公開，用以取代MD4演算法。這套演算法的程序在 RFC 1321 中被加以規範。
將數據（如一段文字）運算變為另一固定長度值，是雜湊算法的基礎原理。`,
        type: "received", icon: "fa-solid fa-mug-hot", isHTML: true },
    { text: `為什麼需要加鹽？<br>
1. 防止彩虹表攻擊：彩虹表是一種預先計算好的雜湊值對應明文的查找表。通過加鹽，即使兩個用戶使用相同的密碼，因為鹽不同，生成的雜湊值也會不同，這樣可以有效防止彩虹表攻擊。<br>
2. 增加破解難度：加鹽後，即使攻擊者獲得了雜湊值，也無法直接通過查找表或暴力破解來獲得原始密碼。這樣使得破解過程變得更加困難和耗時。<br>
3. 提高安全性：每個用戶都可以擁有唯一的鹽，這樣即使使用相同密碼的用戶，其雜湊值也會不同，進一步提高了安全性。`,
        type: "received", icon: "fa-solid fa-mug-hot", isHTML: true },
];

const exampleMessages = [
    { text: "範例1(不加鹽)如下：", type: "received", icon: "fa-solid fa-book" },
    { text: "範例2(加鹽)如下：", type: "received", icon: "fa-solid fa-book" },
    { text: "範例3(自帶鹽)如下：", type: "received", icon: "fa-solid fa-book" },
];

const testMessages = [
    '123','salt,123','salt,hiqdka42bmk,123'
]

window.SharedContent.resultMethod = (setMessages ,inputMessage ,istest) =>{
    if(istest){
        let a = inputMessage;
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: a, type: "sent" }
        ]);
    }

    // 計算 MD5 值並生成對應的變體陣列
    const messageTextArray = ['32位[大]' ,'32位[小]' ,'16位[大]' ,'16位[小]'];
    
    let salt = '';
    if(inputMessage.includes("salt")){
        const array = inputMessage.split(",");
        if(array.length === 3){
            salt = array[2];
            inputMessage = array[3];
        }else if(array.length === 2){
            salt = Math.random().toString(36).substring(2, 15);
            inputMessage = array[2];
        }else{
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: `參數有誤，請參考範例`, type: "received"}
                ]);
            }, 1000);
            return;
        }
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: `加鹽：<br>${salt}`, type: "received cancopy", icon: "fa-solid fa-copy", isHTML: true, copy:salt}
            ]);
        }, 1000); // 避免同時設置，根據 index 添加延遲
    }
    
    const fullMD5 = CryptoJS.MD5(inputMessage+salt).toString();
    const md5Array = [
        fullMD5.toUpperCase(), // 32位[大]
        fullMD5.substring(8, 24).toUpperCase(), // 16位[大]
        fullMD5.toLowerCase(), // 32位[小]
        fullMD5.substring(8, 24).toLowerCase() // 16位[小]
    ];

    // 使用 forEach 處理每個 messageTextArray 的元素
    messageTextArray.forEach((label, index) => {
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: `${label}<br>${md5Array[index]}`, type: "received cancopy", icon: "fa-solid fa-copy", isHTML: true, copy: md5Array[index]}
            ]);
        }, 1000); // 避免同時設置，根據 index 添加延遲
    });
}