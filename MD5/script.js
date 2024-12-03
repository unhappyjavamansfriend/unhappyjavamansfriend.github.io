var messageTextArray = ['32位[大]' ,'32位[小]' ,'16位[大]' ,'16位[小]'];
var beforeStr = '加密前字串';
var afterMD5 = 'MD5加密後';
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
    const upper32 = CryptoJS.MD5(messageText).toString().toUpperCase();
    const upper16 = CryptoJS.MD5(messageText).toString().substring(8, 24).toUpperCase();
    const lower32 = CryptoJS.MD5(messageText).toString().toLowerCase();
    const lower16 = CryptoJS.MD5(messageText).toString().substring(8, 24).toLowerCase();
    
    if(messageText.includes('@@')){
        const type = messageText.split(splitVar)[0];
        messageText = messageText.split(splitVar)[1];
        if(type.includes(messageTextArray[0])){ receivedMessage = upper32;
        }else if(type.includes(messageTextArray[1])){ receivedMessage = lower32;
        }else if(type.includes(messageTextArray[2])){ receivedMessage = upper16;
        }else if(type.includes(messageTextArray[3])){ receivedMessage = lower16;
        }
        receivedMessageArray([
            [beforeStr ,messageText],
            [afterMD5 ,receivedMessage],
        ])
    }else{
        receivedMessageArray([
            [beforeStr ,messageText],
            [afterMD5 ,''],
            [messageTextArray[0] ,upper32],
            [messageTextArray[1] ,lower32],
            [messageTextArray[2] ,upper16],
            [messageTextArray[3] ,lower16],
        ])
    }
    setTimeout(() => {
        toastr.success(toastr_success_encryptData);
    },1000);
}

function sendMessage() {
    const chatBody = document.getElementById('chatBody');
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (messageText === '') return;

    // Create a new message bubble for the sent message
    const sentMessageDivTag = document.createElement('div');
    sentMessageDivTag.classList.add(class_message, class_sent ,class_usermessage);
    sentMessageDivTag.textContent = messageText;
    chatBody.appendChild(sentMessageDivTag);

    resultMethod(messageText); // Sync execution
    // Scroll to the bottom of the chat body
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Clear the input field
    messageInput.value = '';
}