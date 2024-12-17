const comment1 = { text: "請輸入URL編碼，我將幫你轉換成字符串<br>或是輸入字符串，我將幫你轉換成URL編碼。", type: "received", isHTML: true };

const pointMessages = [
    { text: `URL編碼（又稱為百分比編碼）<br>是一種將不適合在url中使用的字符轉換為可安全傳輸的格式的方法。這些字符包括空格、特殊符號等。 編碼使用 % 符號後跟兩位十六進制數字來表示字符。`,
        type: "received", icon: "fa-solid fa-mug-hot", isHTML: true },
];

const exampleMessages = [
];

const testMessages = [
    '%E6%88%91%E6%9C%89%E5%86%B0%E6%B7%87%E6%B7%8B','我有冰淇淋','%21%40%23%24%25%5E%26%2A','!@#$%^&*()','%E4%BD%A0%20%E5%A5%BD','%20%20%20','我有冰淇淋','速度%E8%88%87%E6%BF%80%E6%83%859','Hello%E4%BD%A0%E5%A5%BDWorld','%ZZ速度'
]

const URLToStringToURL = (inputMessage) => {
    let result = 'ok';
    let msg = '';

    try {
        if (inputMessage.includes('%')) {
            try {
                msg =  decodeURIComponent(inputMessage);
            } catch (error) {
                console.error('Decoding failed:', error.message);
                return null; // 如果解码失败，返回 null
            }
        }else {
            msg = encodeURIComponent(inputMessage);
        }
    } catch (error) {
        // if (error instanceof URIError) {
        // }else if (error instanceof TypeError) {
        // }
        console.log(error.name);
        console.log(error.message);
        console.log(error.stack);
    }

    return { result, msg, copy: msg };
};

window.SharedContent.resultMethod = (setMessages ,inputMessage ,istest) =>{
    if(istest){
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: inputMessage, type: "sent" }
        ]);
    }

    const msg = URLToStringToURL(inputMessage);
    if(msg === null){
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                comment1
            ]);
        }, 1000);
    }else if(msg.result === 'error' || istest){
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: msg.msg, type: "received"}
            ]);
        }, 1000);
    }else if(msg.result === 'ok'){
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: msg.msg, type: "received cancopy", icon: "fa-solid fa-copy", isHTML: true, copy: msg.copy}
            ]);
        }, 1000);
    }
}