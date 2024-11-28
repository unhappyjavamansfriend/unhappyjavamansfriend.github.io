var receivedAlertMessag = '請輸入有效的長和寬數值，例如：300*400';
var isExplainClicked = false;
var isExampleClicked = false;

function receivedMessage(messageText){
    setTimeout(() => {
        const receivedMessage = document.createElement('div');
        receivedMessage.classList.add('message', 'received');
        receivedMessage.innerHTML = messageText;
        chatBody.appendChild(receivedMessage);
        
        // Scroll to the bottom of the chat body
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

function sendMessage(ex) {
    const chatBody = document.getElementById('chatBody');
    // const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (messageText === '') return;

    // Create a new message bubble for the sent message
    const sentMessage = document.createElement('div');
    sentMessage.classList.add('message', 'sent');
    sentMessage.textContent = messageText;
    chatBody.appendChild(sentMessage);

    calculateArea(messageText);
    // Scroll to the bottom of the chat body
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Clear the input field
    messageInput.value = '';
}

function removeEx(){
    $('.message.sent.canRemove').remove();
    $('.message.received.canRemove').remove();
    isExplainClicked = false;
    isExampleClicked = false;
}

function explain(){
    if(!isExplainClicked){
        const receivedMessage = document.createElement('div');

        receivedMessage.classList.add('message', 'received' ,'canRemove');
        receivedMessage.innerHTML = `坪是一種常用的面積單位<br>1 坪等於 3.305785 平方公尺`;
        chatBody.appendChild(receivedMessage);
        
        const receivedMessage2 = document.createElement('div');
        receivedMessage2.classList.add('message', 'received' ,'canRemove');
        receivedMessage2.innerHTML = `範例：<br>
                    長：300 公分<br>
                    寬：400 公分<br>
                    面積（平方公分）= 300 × 400 = 120000<br>
                    面積（坪數）= 120000 / 10000（平方公尺） / 3.305785 ≈ 3.63<br>
                    面積: 120000.00 平方公分 ≈ 3.63 坪`;
        chatBody.appendChild(receivedMessage2);
        isExplainClicked = true;
    }
}

function example(){
    if(!isExampleClicked){
        const sentMessage = document.createElement('div');
        sentMessage.classList.add('message', 'sent' ,'canRemove');
        sentMessage.textContent = `300*400`;
        chatBody.appendChild(sentMessage);
        
        const receivedMessage = document.createElement('div');
        receivedMessage.classList.add('message', 'received' ,'canRemove');
        receivedMessage.innerHTML =`長：300 公分<br>
                        寬：400 公分<br>
                        計算結果：3.6300 坪`;
        chatBody.appendChild(receivedMessage);
        isExampleClicked = true;
    }
}

function calculateArea(messageText){
    // 检查输入是否包含 "*"
    if (!messageText.includes("*")) {
        receivedMessage(receivedAlertMessag);
        return;
    }
    
    // 分割長和寬
    var dimensions = messageText.split("*");
    
    // 检查是否有效的数字
    if (isNaN(dimensions[0]) || isNaN(dimensions[1])) {
        receivedMessage(receivedAlertMessag);
        return;
    }

    var length = parseFloat(dimensions[0]);
    var width = parseFloat(dimensions[1]);

    if(length <= 0 || width <= 0) {
        receivedMessage(receivedAlertMessag);
        return;
    }
    
    var areaInSquareCm = length * width;
    var areaInSquareMeters = areaInSquareCm / 10000;
    var areaInPing = areaInSquareMeters / 3.305785;
    // Simulate receiving a reply after a delay

    var calculateMessage = '長：'+length+' 公分<br> 寬：'+width+' 公分<br> 計算結果：'+areaInPing.toFixed(4)+' 坪';
    receivedMessage(calculateMessage);
}
