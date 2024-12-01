var messageTextArray = ['32位[大]' ,'32位[小]' ,'16位[大]' ,'16位[小]'];
titleMessage = `不可逆的信任之鎖， MD5 數據校驗的極致力量！`;
common_header(titleMessage ,isHome);

const map = new Map();
map.set(`title`,`${key_icon} ${titleMessage}`);
map.set(`common_explain_received`,[`MD5訊息摘要演算法（英語：MD5 Message-Digest Algorithm），一種被廣泛使用的密碼雜湊函數，可以產生出一個128位元（16位元組）的散列值（hash value），用於確保信息傳輸完整一致。MD5由羅納德·李維斯特設計，於1992年公開，用以取代MD4演算法。這套演算法的程序在 RFC 1321 中被加以規範。
    將數據（如一段文字）運算變為另一固定長度值，是雜湊算法的基礎原理。`]);
map.set(`common_example_sent`,['qwe123' ,`${messageTextArray[0]}@@qwe123`]);
map.set(`common_example_received`,[`${messageTextArray[0]}：<br> 200820E3227815ED1756A6B531E7E0D2<br>
    ${messageTextArray[1]}：<br> 200820e3227815ed1756a6b531e7e0d2<br>
    ${messageTextArray[2]}：<br> 227815ED1756A6B5<br>
    ${messageTextArray[3]}：<br> 227815ed1756a6b5` ,
   '加密前字串：<br>qwe123<br>MD5加密後：<br>200820E3227815ED1756A6B531E7E0D2']);
map.set(`common_type123_received` ,[messageTextArray[0]+splitVar,
    messageTextArray[1]+splitVar,
    messageTextArray[2]+splitVar,
    messageTextArray[3]+splitVar
]);
initContainer(map ,isHome);

function resultMethod(messageText) {
    var receivedMessage = null;
    if(messageText === null || messageText === ''){
        return [receivedMessage ,receivedMessage];
    }
    // console.log(messageText)
    const upper32 = CryptoJS.MD5(messageText).toString().toUpperCase();
    const upper16 = CryptoJS.MD5(messageText).toString().substring(8, 24).toUpperCase();
    const lower32 = CryptoJS.MD5(messageText).toString().toLowerCase();
    const lower16 = CryptoJS.MD5(messageText).toString().substring(8, 24).toLowerCase();
    // console.log(`upper32=${upper32}`)
    // console.log(`upper16=${upper16}`)
    // console.log(`lower32=${lower32}`)
    // console.log(`lower16=${lower16}`)
    
    if(messageText.includes('@@')){
        const type = messageText.split(splitVar)[0];
        messageText = messageText.split(splitVar)[1];
        if(messageText === ''){
            return [receivedMessage ,receivedMessage];
        }else if(type.includes(messageTextArray[0])){ receivedMessage = upper32;
        }else if(type.includes(messageTextArray[1])){ receivedMessage = lower32;
        }else if(type.includes(messageTextArray[2])){ receivedMessage = upper16;
        }else if(type.includes(messageTextArray[3])){ receivedMessage = lower16;
        }

        receivedMessage = `加密前字串：<br>${messageText}<br>
                            MD5加密後：${type}<br>${receivedMessage}`;
    }else{
        receivedMessage = `加密前字串：<br>${messageText}<br>
        MD5加密後：<br>
            ${messageTextArray[0]}：<br>${upper32}<br>
            ${messageTextArray[1]}：<br>${lower32}<br>
            ${messageTextArray[2]}：<br>${upper16}<br>
            ${messageTextArray[3]}：<br>${lower16}
        `;
    }

    return [receivedMessage ,receivedMessage.replaceAll('<br>','')];
}