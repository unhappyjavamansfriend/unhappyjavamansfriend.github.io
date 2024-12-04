const { key, value ,classname } = linkGroup[3];
titleMessage = value[1];
common_header(titleMessage ,isHome);

const map = new Map();
map.set(`title`,`${code_icon} ${titleMessage}`);
map.set(`common_explain_received`,[`URL編碼（又稱為百分比編碼）
    編碼 是一種將不適合在  中使用的字符轉換為可安全傳輸的格式的方法。這些字符包括空格、特殊符號等。 編碼使用 % 符號後跟兩位十六進制數字來表示字符。
    `]);
    map.set(`common_example_sent`,[`%E6%88%91%E6%9C%89%E5%86%B0%E6%B7%87%E6%B7%8B`,
        `速度與激情9`,
    ]);
    map.set(`common_example_received`,[`我有冰淇淋`,
    `%E9%80%9F%E5%BA%A6%E8%88%87%E6%BF%80%E6%83%859`,
    ]);

// map.set(`common_type123_received` ,[`decodeURI@@` ,`encodeURI@@`]);

map.set('common_unittest_array' ,[
    () => sendMessage_unittest('%21%40%23%24%25%5E%26%2A'),
    () => sendMessage_unittest('!@#$%^&*()'),
    () => sendMessage_unittest('%E4%BD%A0%20%E5%A5%BD'),
    () => sendMessage_unittest('%20%20%20'),
    () => sendMessage_unittest('速度與%E8%88%87%E6%BF%80%E6%83%85'),
    () => sendMessage_unittest('Hello%E4%BD%A0%E5%A5%BDWorld'),
    () => sendMessage_unittest('%ZZ速度'),
])
initContainer(map ,isHome);

function resultMethod(messageText) {
    var receivedMessage = null;
    try {
        if (messageText.includes('%')) {
            receivedMessage = urlToChinese(messageText);
        }else {
            receivedMessage = encodeURIComponent(messageText);
        }
    } catch (error) {
        if (error instanceof URIError) {
            console.log(error.name);
            console.log(error.message);
            console.log(error.stack);
        }
    }
    return [receivedMessage ,receivedMessage]
}

function urlToChinese(urlEncoded) {
    try {
        return decodeURIComponent(urlEncoded);
    } catch (error) {
        console.error('Decoding failed:', error.message);
        return null; // 如果解码失败，返回 null
    }
}


/** test console log start */

function resultMethodWithConsolelog(messageText) {
    console.log(`${dividingLine}`);
    console.log(`message=${messageText}`)
    var receivedMessage = null;
    try {
        if (messageText.includes('%')) {
            console.log(`convert URL to Chinese`)
            receivedMessage = urlToChinese(messageText);
            console.log(`after=${receivedMessage}`)
        }else {
            console.log(`convert Chinese to URL`)
            receivedMessage = encodeURIComponent(messageText);
            console.log(`after=${receivedMessage}`)
        }
    } catch (error) {
        if (error instanceof URIError) {
            console.log(error.name);
            console.log(error.message);
            console.log(error.stack);
        }
    }
    return [receivedMessage ,receivedMessage]
}
