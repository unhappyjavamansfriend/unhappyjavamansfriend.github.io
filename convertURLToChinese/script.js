var receivedAlertMessag = '無效輸入';

var isExplainClicked = false;
var isExampleClicked = false;

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

    var receivedMessag = convertToChinese(messageText);
    // Scroll to the bottom of the chat body
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Clear the input field
    messageInput.value = '';
    if(receivedMessag === null){
        receivedMessage(receivedAlertMessag);
    }else if(typeof receivedMessag === 'undefined'){
        receivedMessage(receivedAlertMessag);
    }else{
        receivedMessage(receivedMessag);
    }
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

function convertToChinese(input) {
    try {
        if (input.startsWith('%')) {
            return decodeURIComponent(input);
        }else {
            return encodeURIComponent(input);
        }
    } catch (e) {
        if (e instanceof URIError) {
            console.log(e.name);
            console.log(e.message);
            console.log(e.stack);
        }
    }
    return null;
}

function removeEx(){
    $('.message.sent.canRemove').remove();
    $('.message.received.canRemove').remove();
    
    isExplainClicked=false;
    isExampleClicked=false;
}

function explain(){
    if(!isExplainClicked){
        const receivedMessage = document.createElement('div');
        receivedMessage.classList.add('message', 'received' ,'canRemove');
        receivedMessage.innerHTML = `URL編碼（又稱為百分比編碼）
                 編碼 是一種將不適合在  中使用的字符轉換為可安全傳輸的格式的方法。這些字符包括空格、特殊符號等。 編碼使用 % 符號後跟兩位十六進制數字來表示字符。
            `;
        chatBody.appendChild(receivedMessage);
        isExplainClicked = true;
    }
}

function example(){
    if(!isExampleClicked){
        const sentMessage = document.createElement('div');
        sentMessage.classList.add('message', 'sent' ,'canRemove');
        sentMessage.textContent = `%E6%88%91%E6%9C%89%E5%86%B0%E6%B7%87%E6%B7%8B`;
        chatBody.appendChild(sentMessage);
        
        const receivedMessage = document.createElement('div');
        receivedMessage.classList.add('message', 'received' ,'canRemove');
        receivedMessage.innerHTML =`我有冰淇淋`;
        chatBody.appendChild(receivedMessage);
        isExampleClicked = true;

        const sentMessage2 = document.createElement('div');
        sentMessage2.classList.add('message', 'sent' ,'canRemove');
        sentMessage2.textContent = `速度與激情9`;
        chatBody.appendChild(sentMessage2);
        
        const receivedMessage2 = document.createElement('div');
        receivedMessage2.classList.add('message', 'received' ,'canRemove');
        receivedMessage2.innerHTML =`%E9%80%9F%E5%BA%A6%E8%88%87%E6%BF%80%E6%83%859`;
        chatBody.appendChild(receivedMessage2);
        isExampleClicked = true;
    }
}