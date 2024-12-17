const comment1 = { text: "請輸入十六進制 (用 ',' 隔開)，我將幫你轉換成字符串<br>或是輸入字符串，我將幫你轉換成十六進制。", type: "received" , isHTML: true};

const pointMessages = [
    { text: `十六進制是一種數字系統，使用 0-9 和 A-F 來表示數字。在計算機科學中，十六進制常用於表示字節值或顏色值。每個十六進制數字代表四個二進制位（bit），因此兩個十六進制數字可以表示一個字節（8 位）`,
        type: "received", icon: "fa-solid fa-mug-hot", isHTML: true },
];

const exampleMessages = [
];

const testMessages = [
    '0x51b0,0x6dc7,0x6dcb','我很喜歡','0x62110x6211','0x6211 0x6211','０ｘ６２１１','0x5F88,冰,',',0x5F88,0x5590x6211','我很喜歡,0x51b0,0x6dc7,0x6dcb',',淇,','0x51b0,淇,0x6dcb','冰,0x6dc7,淋','0x51b0,0x6dc7,0x6dcb','我很喜歡'
]

const HexArrayToStringToHexArray = (inputMessage) => {
    let result = 'ok';
    let msg = '';

    if (inputMessage.includes(",")) {
        // 處理以逗號分隔的輸入
        const array = inputMessage.split(",");
        msg = array
            .map(code => 
                typeof code === 'string' && code.startsWith('0x') 
                    ? String.fromCharCode(parseInt(code, 16)) 
                    : code
            )
            .join('');
    } else if (/^0x[0-9A-Fa-f]+$/.test(inputMessage)) {
        msg = String.fromCharCode(parseInt(inputMessage, 16));
    } else {
        // 處理非十六進制的普通字串
        msg = stringToHexArray(inputMessage).toString();
    }

    return { result, msg, copy: msg };
};

// 將字符串轉換為十六進制數組
const stringToHexArray = (messageText) => {
    return Array.from(messageText).map(char => '0x'+char.charCodeAt(0).toString(16).padStart(2, '0'));
}

window.SharedContent.resultMethod = (setMessages ,inputMessage ,istest) =>{
    if(istest){
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: inputMessage, type: "sent" }
        ]);
    }

    const msg = HexArrayToStringToHexArray(inputMessage);

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