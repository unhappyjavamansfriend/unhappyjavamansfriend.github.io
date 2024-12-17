const comment1 = { text: "請先輸入單位 (公分/cm/公尺/m)，接著輸入兩個數值來代表長和寬 (用 ',' 隔開)，我將幫你計算坪數。", type: "received" };

const pointMessages = [
    { text: `1平方公尺 = 0.3025坪<br>
                        1坪 = 3.30579 平方公尺<br>
                        1公頃 = 10000 平方公尺= 3025 坪= 1.03102 甲<br>
                        1甲 = 10 分= 2934 坪= 0.96992 公頃<br>
                        1平方公里 = 100 公頃`, type: "received", icon: "fa-solid fa-mug-hot", isHTML: true },
    { text: `The size of my house is 115.710 square meters (sqm.) which is equal to 35 Taiwanese ping. <br>
        我家面積為115.710平方公尺相當於35台坪`, type: "received", icon: "fa-solid fa-mug-hot", isHTML: true }
];

const exampleMessages = [
];

const testMessages = [
    '公分,300,400','m,3,4','　,　, ','cm,　　,123','cm,-155,123','cm,123,asd','cm asd 123','m,１２３,４５６','cm,123,123,123','cm,123,456'
];

const calculatePings = (length, width, unit) => {
                    
    let areaSquareMeters = 0;
    if (unit === "cm") {
        areaSquareMeters = (length / 100) * (width / 100); // 公分轉平方公尺
    } else if (unit === "m") {
        areaSquareMeters = length * width; // 直接為平方公尺
    }
    const result = (areaSquareMeters / 0.3025).toFixed(2); // 平方公尺轉坪數
    const resultMessage = `長：${length} ${unit === "cm" ? "公分" : "公尺"}<br>寬：${width} ${unit === "cm" ? "公分" : "公尺"}<br>計算結果：${result} 坪`;
    return { resultMessage, copy: result};
};

window.SharedContent.resultMethod = (setMessages ,inputMessage ,istest) =>{
    if(istest){
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: inputMessage, type: "sent" }
        ]);
    }
    let result = 'ok';
    const array = inputMessage.split(",");
    const resultArray = []; // 多個錯誤訊息用

    if (array.length !== 3 || !inputMessage.includes(",")) {
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                comment1,
                { text: "公分,300,400", type: "received" },
                { text: "cm,300,400", type: "received" },
                { text: "公尺,3,4", type: "received" },
                { text: "m,3,4", type: "received" },
                window.SharedContent.comment2
                // { text: `'${array}' 參數有誤，請參考範例`, type: "received"}
            ]);
        }, 1000);
        return;
    }

    let unit = array[0];
    if(!unit.includes("公分") &&
        !unit.includes("cm") &&
        !unit.includes("公尺") &&
        !unit.includes("m")) {
        result = 'error';
        resultArray.push(`'${unit}' 單位錯誤，請輸入以下單位 (公分/cm/公尺/m)`);
    }
    
    if (array[1] < 0){
        result = 'error';
        resultArray.push(`'${array[1]}' 為負數`);
    }
    
    if (array[2] < 0){
        result = 'error';
        resultArray.push(`'${array[2]}' 為負數`);
    }

    let length = parseFloat(array[1].trim().replace(/[^\d.]/g, ""));
    let width = parseFloat(array[2].trim().replace(/[^\d.]/g, ""));

    if (isNaN(length) || typeof length !== "number"){
        result = 'error';
        resultArray.push(`'${array[1]}' 非數值`);
    }
    
    if (isNaN(width) || typeof width !== "number") {
        result = 'error';
        resultArray.push(`'${array[2]}' 非數值`);
    }

    if(istest){
        if(result === 'error'){
            resultArray.forEach((msg) => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: msg, type: "received"}
                ]);
            });
            return;
        }

        if(unit.includes("公分") ||
        unit.includes("cm") ||
        unit.includes("公尺") ||
        unit.includes("m")
        ) {
            const msg = calculatePings(length, width, unit);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: msg.resultMessage, type: "received", isHTML: true}
            ]);
        }

    }else{
        if(result === 'error'){
            resultArray.forEach((msg) => {
                setTimeout(() => {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { text: msg, type: "received"}
                    ]);
                }, 1000);
            });
            return;
        }

        if(unit.includes("公分") ||
        unit.includes("cm") ||
        unit.includes("公尺") ||
        unit.includes("m")
        ) {
            const msg = calculatePings(length, width, unit);
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: msg.resultMessage, type: "received cancopy", icon: "fa-solid fa-copy", isHTML: true, copy: msg.copy}
                ]);
            }, 1000);
        }

    }
}