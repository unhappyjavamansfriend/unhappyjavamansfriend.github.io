const { key, value ,classname } = linkGroup[1];
titleMessage = value[1];
common_header(titleMessage ,isHome);

const map = new Map();
map.set(`emailSubject`,titleMessage);
map.set(`title`,`${code_icon} ${titleMessage}`);
map.set(`common_intro_received`,[`十六進制是一種數字系統，使用 0-9 和 A-F 來表示數字。在計算機科學中，十六進制常用於表示字節值或顏色值。每個十六進制數字代表四個二進制位（bit），因此兩個十六進制數字可以表示一個字節（8 位）`]);
// map.set(`common_example_sent`,[`0x6211,0x5F88,0x559C,0x6B61` ,`冰淇淋`]);
// map.set(`common_example_received`,[`我很喜歡` ,`0x51b0,0x6dc7,0x6dcb`]);
map.set('common_unittest_array' ,[
    () => sendMessage_unittest('0x62110x6211'),
    () => sendMessage_unittest('0x6211 0x6211'),
    () => sendMessage_unittest('０ｘ６２１１'),
    () => sendMessage_unittest('0x5F88,冰,'),
    () => sendMessage_unittest(',0x5F88,0x5590x6211'),
    () => sendMessage_unittest('我很喜歡,0x51b0,0x6dc7,0x6dcb'),
    () => sendMessage_unittest(',淇,'),
    () => sendMessage_unittest('0x51b0,淇,0x6dcb'),
    () => sendMessage_unittest('冰,0x6dc7,淋'),
    () => sendMessage_unittest('0x51b0,0x6dc7,0x6dcb,我很喜歡,')
])
initContainer(map ,isHome);

// 將十六進制數組轉換為字符串
function resultMethod(messageText) {
    splitVar = ",";
    var receivedMessage = null;
    if(messageText.match(/0x[0-9A-Fa-f]+/g)) {
        if(messageText.includes(splitVar)){
            var array = messageText.split(splitVar);
            if (Array.isArray(array)) {
                receivedMessage = array.map(code => 
                    typeof code === 'string' && code.startsWith('0x') 
                    ? String.fromCharCode(parseInt(code, 16)) 
                    : code)
                    .join('');
            }
        }else if(messageText.length > 6){
        }else if(messageText.match(/0x[0-9A-Fa-f]+/g)) {
            receivedMessage = String.fromCharCode(messageText);
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

/** test console log start */

function resultMethodWithConsolelog(messageText) {
    console.log(`${dividingLine}`);
    console.log(`message=${messageText}`)
    splitVar = ",";
    var receivedMessage = null;
    if(messageText.match(/0x[0-9A-Fa-f]+/g)) {
        console.log(`convert Hexadecimal to Chinese`)
        if(messageText.includes(splitVar)){
            var array = messageText.split(splitVar);
            console.log(`array=${array}`)
            if (Array.isArray(array)) {
                receivedMessage = array.map(code => 
                    typeof code === 'string' && code.startsWith('0x') 
                    ? String.fromCharCode(parseInt(code, 16)) 
                    : code)
                    .join('');
                console.log(`after=${receivedMessage}`)
            }
        }else if(messageText.length > 6){
            console.log(`one but length > 6=${messageText}`)
        }else if(messageText.match(/0x[0-9A-Fa-f]+/g)) {
            receivedMessage = String.fromCharCode(messageText);
            console.log(`one=${receivedMessage}`)
        }
    }else{
        // 無法trim 十六進制數組所以toString()，詳見message.js hiddenElement()
        receivedMessage = stringToHexArray(messageText).toString();
        console.log(`convert Chinese to Hexadecimal=${receivedMessage}`)
    }
    console.log(`receivedMessage=${receivedMessage}`)
    return [receivedMessage ,receivedMessage];
}
