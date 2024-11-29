var receivedErrorMessage = '無效輸入';

function resultMethod(messageText) {
    try {
        if (messageText.startsWith('%')) {
            return decodeURIComponent(messageText);
        }else {
            var messageText1 = encodeURIComponent(messageText);
            if (messageText1.includes('%')) {
                return receivedErrorMessage
            }else{
                return messageText;
            } 
        }
    } catch (e) {
        if (e instanceof URIError) {
            console.log(e.name);
            console.log(e.message);
            console.log(e.stack);
            return receivedErrorMessage;
        }
    }
}

function explain(){
    var receivedMessageArray = [`URL編碼（又稱為百分比編碼）
                 編碼 是一種將不適合在  中使用的字符轉換為可安全傳輸的格式的方法。這些字符包括空格、特殊符號等。 編碼使用 % 符號後跟兩位十六進制數字來表示字符。
            `]
    common_explain(receivedMessageArray);
}

function example(){
    var sentMessageArray = [`%E6%88%91%E6%9C%89%E5%86%B0%E6%B7%87%E6%B7%8B`,`速度與激情9`]
    var receivedMessageArray = [`我有冰淇淋`,`%E9%80%9F%E5%BA%A6%E8%88%87%E6%BF%80%E6%83%859`]
    common_example(sentMessageArray ,receivedMessageArray);
}