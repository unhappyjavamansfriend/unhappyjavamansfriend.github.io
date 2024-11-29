isTypeClicked = false;
function resultMethod(messageText) {
    var receivedMessage = '';
    if(messageText.includes(splitVar)){
        var type = messageText.split(splitVar)[0]
        messageText = messageText.split(splitVar)[1]
    }
    try {
    // URL 轉換字符 decodeURIComponent 
    // 字符轉換URL encodeURIComponent 
        if(type === 'decodeURI'){
            // console.log("a")
            receivedMessage = decodeURIComponent(messageText);
        }else if(type === 'encodeURI'){
            // console.log("b")
            receivedMessage = encodeURIComponent(messageText);
        }else if (messageText.startsWith('%')) {
            // console.log("c")
            receivedMessage = decodeURIComponent(messageText);
        }else {
            // console.log("d")
            receivedMessage = encodeURIComponent(messageText);
        }
    } catch (e) {
        if (e instanceof URIError) {
            console.log(e.name);
            console.log(e.message);
            console.log(e.stack);
            receivedMessage = null;
        }
    }
    return [receivedMessage ,receivedMessage]
}

function explain(){
    var receivedMessageArray = [`URL編碼（又稱為百分比編碼）
                 編碼 是一種將不適合在  中使用的字符轉換為可安全傳輸的格式的方法。這些字符包括空格、特殊符號等。 編碼使用 % 符號後跟兩位十六進制數字來表示字符。
            `]
    common_explain(receivedMessageArray);
}

function example(){
    var sentMessageArray = [`%E6%88%91%E6%9C%89%E5%86%B0%E6%B7%87%E6%B7%8B`,
        `速度與激情9`,
        // `速度與%E6%BF%80%E6%83%859`,
        // `%E9%80%9F%E5%BA%A6%E8%88%87激情9`
        ]
    var receivedMessageArray = [`我有冰淇淋`,
        `%E9%80%9F%E5%BA%A6%E8%88%87%E6%BF%80%E6%83%859`,
        // `%E9%80%9F%E5%BA%A6%E8%88%87%25E6%25BF%2580%25E6%2583%25859`,
        // `速度與激情9`
        ]
    common_example(sentMessageArray ,receivedMessageArray);
}

var messageTextArray = [`decodeURI` ,`encodeURI`]
function type(){
    var receivedMessageArray = [messageTextArray[0]+splitVar,
                                messageTextArray[1]+splitVar
                            ]
    common_type(receivedMessageArray)
}

// function example2(){
//     var sentMessageArray = [``,``,
//         `decodeURI@@%E5%BA%A6與%E6%BF%80%E6%83%859`,
//         `encodeURI@@%E5%BA%A6與%E6%BF%80%E6%83%859`,
//         `decodeURI@@速度與%E6%BF%80%E6%83%859`,
//         `encodeURI@@速%E5%BA%A6與%E6%BF%80%E6%83%859`
//         ]
//     var receivedMessageArray = [`更多範例如下：`,`decodeURI：URL 轉換字符 
//         encodeURI：字符轉換URL`,`度與激情9`,
//         `%25E5%25BA%25A6%E8%88%87%25E6%25BF%2580%25E6%2583%25859`,
//         `速度與激情9`,
//         `%E9%80%9F%25E5%25BA%25A6%E8%88%87%25E6%25BF%2580%25E6%2583%25859`
//         ]
//     common_example(sentMessageArray ,receivedMessageArray);
// }