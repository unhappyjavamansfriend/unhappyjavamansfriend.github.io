const { key, value ,classname } = linkGroup[2];
titleMessage = value[1];
common_header(titleMessage ,isHome);

const map = new Map();
map.set(`title`,`${code_icon} ${titleMessage}`);
map.set(`common_explain_received`,[`Unicode 是一種字符編碼標準，旨在為世界上所有的字符提供唯一的編碼。每個字符都有一個對應的數字編碼，通常以十六進制表示。`]);
map.set(`common_example_sent`,[`\\u65E9\\u4E0A\\u597D\\u4E2D\\u570B` ,`我很喜歡冰淇淋`]);
map.set(`common_example_received`,[`早上好中國` ,`\\u6211\\u5f88\\u559c\\u6b61\\u51b0\\u6dc7\\u6dcb`]);
map.set('common_unittest_array' ,[
    () => sendMessage_unittest(' \\u  asd\\u65E9'),
    () => sendMessage_unittest('\\uZZZZ\\u570B'), // 部分无效
    () => sendMessage_unittest('\\u4E00\\u9FFF'), // 边界值
    () => sendMessage_unittest('\\u\\u65E9'),
    () => sendMessage_unittest('asd\\u65E9asd\\u65E9'),
    () => sendMessage_unittest('\\u65E9上好\\u4E2D\\u570B'),
    () => sendMessage_unittest('\\u６２Ｅ９'),
    () => sendMessage_unittest('早上好'),
])
initContainer(map ,isHome);

function resultMethod(messageText) {
    var receivedMessage = null;
    if (messageText.includes('\\u')) {
        receivedMessage = messageText.split('\\u').map((code, index) => 
            index > 0 && code.length >= 4 && !isNaN(parseInt(code.substring(0, 4), 16)) 
                ? String.fromCharCode(parseInt(code.substring(0, 4), 16)) + code.substring(4) // 转换 Unicode 并保留后续字符串
                : code // 保留原样
        )
        .join(''); // 合并为字符串
    }else{
        // 將字符串轉換為 Unicode 編碼格式 (\uXXXX)
        receivedMessage = Array.from(messageText)
        .map(char => {
            const codePoint = char.codePointAt(0).toString(16);
            return codePoint.length > 4 
            ? `\\u{${codePoint}}`
            : `\\u${codePoint.padStart(4, '0')}`;
        })
        .join('');
    }
    return [receivedMessage ,receivedMessage];
}

/** test console log start */
function resultMethodWithConsolelog(messageText) {
    console.log(`${dividingLine}`);
    console.log(`message=${messageText}`)
    var receivedMessage = null;
    if (messageText.includes('\\u')) {
        console.log(`convert Unicode to Chinese`)
        receivedMessage = messageText.split('\\u').map((code, index) => 
            index > 0 && code.length >= 4 && !isNaN(parseInt(code.substring(0, 4), 16)) 
                ? String.fromCharCode(parseInt(code.substring(0, 4), 16)) + code.substring(4) // 转换 Unicode 并保留后续字符串
                : code // 保留原样
        )
        .join(''); // 合并为字符串
        console.log(`after=${receivedMessage}`)
    }else{
        console.log(`convert Chinese to Unicode`)
        // 將字符串轉換為 Unicode 編碼格式 (\uXXXX)
        receivedMessage = Array.from(messageText)
        .map(char => {
            const codePoint = char.codePointAt(0).toString(16);
            return codePoint.length > 4 
            ? `\\u{${codePoint}}`
            : `\\u${codePoint.padStart(4, '0')}`;
        })
        .join('');
        console.log(`after=${receivedMessage}`)
    }
    return [receivedMessage ,receivedMessage];
}
