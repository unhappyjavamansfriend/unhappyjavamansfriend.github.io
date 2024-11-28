var receivedAlertMessag = '請輸入有效的長和寬數值，例如：300*400';

function sendMessage() {
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
