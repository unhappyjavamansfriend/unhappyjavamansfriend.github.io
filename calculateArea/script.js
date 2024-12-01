const map = new Map();
map.set(`title`,`${calculator_icon} 無懼挑戰：精準換算公分與坪數！`);
map.set(`common_explain_received`,[`坪是一種常用的面積單位<br>1 坪等於 3.305785 平方公尺`,
    `範例：<br>
    長：300 公分<br>
    寬：400 公分<br>
    面積（平方公分）= 300 × 400 = 120000<br>
    面積（坪數）= 120000 / 10000（平方公尺） / 3.305785 ≈ 3.63<br>
    面積: 120000.00 平方公分 ≈ 3.63 坪`
            ]);
map.set(`common_example_sent`,[``,`300*400`]);
map.set(`common_example_received`,[`請輸入300*400`,`長：300 公分<br>
    寬：400 公分<br>
    計算結果：3.6300 坪`]);
initContainer(map)
toastr_warning_errotMessage = '請輸入有效的長和寬數值，例如：300*400';

function resultMethod(messageText){
    var resultMessage = '';
    var copyMessage = '';
    if (!messageText.includes("*")) {
        resultMessage = null;
        return [resultMessage ,copyMessage];
    }
    
    var dimensions = messageText.split("*");
    
    // 检查是否有效的数字
    if (isNaN(dimensions[0]) || isNaN(dimensions[1])) {
        resultMessage = null;
        return [resultMessage ,copyMessage];
    }
    
    var length = parseFloat(dimensions[0]);
    var width = parseFloat(dimensions[1]);
    
    if(length <= 0 || width <= 0) {
        resultMessage = null;
        return [resultMessage ,copyMessage];
    }
    
    var areaInSquareCm = length * width;
    var areaInSquareMeters = areaInSquareCm / 10000;
    var areaInPing = areaInSquareMeters / 3.305785;
    // Simulate receiving a reply after a delay
    
    var resultMessage = `長：${length} 公分<br>
                寬：${width} 公分<br> 
                計算結果：${areaInPing.toFixed(4)} 坪`;

    var copyMessage = `${areaInPing.toFixed(4)}坪`;

    return [resultMessage ,copyMessage];
}