const comment1 = { text: "請輸入Base64，我將幫你轉換成字符串<br>或是輸入字符串，我將幫你轉換成Base64。", type: "received" , isHTML: true};

const pointMessages = [
    { text: `一种将二进制数据转换为ASCII字符的编码方式，常用于电子邮件和数据传输。`,
        type: "received", icon: "fa-solid fa-mug-hot", isHTML: true },
];

const exampleMessages = [
];

const testMessages = [
];

// 正则表达式匹配 Base64 编码格式
const isBase64 = (str) => {
    const regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/;
    if(regex.test(str)){
        // Base64 转字符串
        return decodeURIComponent(escape(atob(str)));
    }
    // 字符串转 Base64
    return btoa(unescape(encodeURIComponent(str)));
}

window.SharedContent.resultMethod = (setMessages ,inputMessage ,istest) =>{
    if(istest){
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: inputMessage, type: "sent" }
        ]);
    }

    let msg = isBase64(inputMessage);

    setTimeout(() => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: msg, type: "received cancopy", icon: "fa-solid fa-copy", isHTML: true, copy: msg}
        ]);
    }, 1000);
}
