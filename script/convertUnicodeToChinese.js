const comment1 = { text: "請輸入Unicode，我將幫你轉換成字符串<br>或是輸入字符串，我將幫你轉換成Unicode。", type: "received", isHTML: true };

const pointMessages = [
    { text: `Unicode 是一種字符編碼標準，旨在為世界上所有的字符提供唯一的編碼。每個字符都有一個對應的數字編碼，通常以十六進制表示`,
        type: "received", icon: "fa-solid fa-mug-hot", isHTML: true },
];

const exampleMessages = [
];

const testMessages = [
    '我很喜歡冰淇淋',' \\u  asd\\u65E9','\\uZZZZ\\u570B','早上好中國','\\u65E9\\u4E0A\\u597D\\u4E2D\\u570B','\\u4E00\\u9FFF','\\u\\u65E9','asd\\u65E9asd\\u65E9','\\u65E9上好\\u4E2D\\u570B','\\u６２Ｅ９'
]


const UnicodeToStringToUnicode = (inputMessage) => {
    let result = 'ok';
    let msg = '';

    if (inputMessage.includes('\\u')) {
        msg = inputMessage.split('\\u').map((code, index) => 
            index > 0 && code.length >= 4 && !isNaN(parseInt(code.substring(0, 4), 16)) 
                ? String.fromCharCode(parseInt(code.substring(0, 4), 16)) + code.substring(4) // 转换 Unicode 并保留后续字符串
                : code // 保留原样
        )
        .join(''); // 合并为字符串
    }else{
        // 將字符串轉換為 Unicode 編碼格式 (\uXXXX)
        msg = Array.from(inputMessage)
        .map(char => {
            const codePoint = char.codePointAt(0).toString(16);
            return codePoint.length > 4 
            ? `\\u{${codePoint}}`
            : `\\u${codePoint.padStart(4, '0')}`;
        })
        .join('');
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

    const msg = UnicodeToStringToUnicode(inputMessage);

    if(msg.result === 'error' || istest){
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