var receivedErrorMessage = '無效輸入';

// 將十六進制數組轉換為字符串
function resultMethod(input) {
    if(input.match(/0x[0-9A-Fa-f]+/g)) {
        var array = input.split(splitVar);
        if (Array.isArray(array)) {
            return array.map(code => String.fromCharCode(code)).join('');
        }
    }else{
        return stringToHexArray(input);
    }
    return receivedErrorMessage;
}

// 將字符串轉換為十六進制數組
function stringToHexArray(input) {
    return Array.from(input).map(char => '0x'+char.charCodeAt(0).toString(16).padStart(2, '0'));
}

function explain(){
    var receivedMessageArray = [`十六進制是一種數字系統，使用 0-9 和 A-F 來表示數字。在計算機科學中，十六進制常用於表示字節值或顏色值。每個十六進制數字代表四個二進制位（bit），因此兩個十六進制數字可以表示一個字節（8 位）`];
    common_explain(receivedMessageArray);
}

function example(){
    var sentMessageArray = [`0x6211@@0x5F88@@0x559C@@0x6B61` ,`冰淇淋`]
    var receivedMessageArray = [`我很喜歡` ,`0x51b0@@0x6dc7@@0x6dcb`]
    common_example(sentMessageArray ,receivedMessageArray);
}
