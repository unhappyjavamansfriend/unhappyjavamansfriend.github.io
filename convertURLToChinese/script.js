titleMessage = `解密編碼世界，掌握字符解析 URL！`;
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
initContainer(map ,isHome);

function resultMethod(messageText) {
    var receivedMessage = null;
    if(messageText.includes(splitVar)){
        var type = messageText.split(splitVar)[0];
        messageText = messageText.split(splitVar)[1];
    }
    try {
    // URL 轉換字符 decodeURIComponent 
    // 字符轉換URL encodeURIComponent 
        if (messageText.startsWith('%')) {
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
        }
    }
    return [receivedMessage ,receivedMessage]
}