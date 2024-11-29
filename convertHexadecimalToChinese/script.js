// 將十六進制數組轉換為字符串
function resultMethod(messageText) {
    splitVar = ",";
    var receivedMessage = '';
    if(messageText.match(/0x[0-9A-Fa-f]+/g)) {
        if(messageText.includes(splitVar)){
            var array = messageText.split(splitVar);
            if (Array.isArray(array)) {
                receivedMessage = array.map(code => String.fromCharCode(code)).join('')
            }
        }else if(messageText.length > 6){
            receivedMessage = null;
        }else if(messageText.match(/0x[0-9A-Fa-f]+/g)) {
            receivedMessage = String.fromCharCode(messageText)
        }
    }else{
        // 無法trim 十六進制數組所以toString()，詳見message.js hiddenElement()
        receivedMessage = stringToHexArray(messageText).toString();
    }
    return [receivedMessage ,receivedMessage];
}

// 將字符串轉換為十六進制數組
function stringToHexArray(messageText) {
    return Array.from(messageText).map(char => '0x'+char.charCodeAt(0).toString(16).padStart(2, '0'));
}

function explain(){
    var receivedMessageArray = [`十六進制是一種數字系統，使用 0-9 和 A-F 來表示數字。在計算機科學中，十六進制常用於表示字節值或顏色值。每個十六進制數字代表四個二進制位（bit），因此兩個十六進制數字可以表示一個字節（8 位）`];
    common_explain(receivedMessageArray);
}

function example(){
    var sentMessageArray = [`0x6211,0x5F88,0x559C,0x6B61` ,`冰淇淋`]
    var receivedMessageArray = [`我很喜歡` ,`0x51b0,0x6dc7,0x6dcb`]
    common_example(sentMessageArray ,receivedMessageArray);
}
