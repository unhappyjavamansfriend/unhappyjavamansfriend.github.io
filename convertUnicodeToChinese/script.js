var receivedErrorMessage = '無效輸入';

function resultMethod(input) {
    if (input.startsWith('\\u')) {
        return input.split('\\u').map(code => {
            return code ? String.fromCharCode(parseInt(code, 16)) : '';
        }).join('');
    }else{
        // 將字符串轉換為 Unicode 編碼格式 (\uXXXX)
        return Array.from(input)
        .map(char => {
            const codePoint = char.codePointAt(0).toString(16);
            return codePoint.length > 4 
            ? `\\u{${codePoint}}`
            : `\\u${codePoint.padStart(4, '0')}`;
        })
        .join('');
    }
}

function explain(){
    var receivedMessageArray = [`Unicode 是一種字符編碼標準，旨在為世界上所有的字符提供唯一的編碼。每個字符都有一個對應的數字編碼，通常以十六進制表示。`];
    common_explain(receivedMessageArray);
}

function example(){
    var sentMessageArray = [`\\u65E9\\u4E0A\\u597D\\u4E2D\\u570B` ,`我很喜歡冰淇淋`]
    var receivedMessageArray = [`早上好中國` ,`\\u6211\\u5f88\\u559c\\u6b61\\u51b0\\u6dc7\\u6dcb`]
    common_example(sentMessageArray ,receivedMessageArray);
}