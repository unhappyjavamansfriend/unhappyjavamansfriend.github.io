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
        receivedMessage.innerHTML = `Unicode 是一種字符編碼標準，旨在為世界上所有的字符提供唯一的編碼。每個字符都有一個對應的數字編碼，通常以十六進制表示。`;
        chatBody.appendChild(receivedMessage);
        isExplainClicked = true;
    }
}

function example(){
    if(!isExampleClicked){
        const sentMessage = document.createElement('div');
        sentMessage.classList.add('message', 'sent' ,'canRemove');
        sentMessage.textContent = '\\u65E9\\u4E0A\\u597D\\u4E2D\\u570B';
        chatBody.appendChild(sentMessage);
        
        const receivedMessage = document.createElement('div');
        receivedMessage.classList.add('message', 'received' ,'canRemove');
        receivedMessage.innerHTML =`早上好中國`;
        chatBody.appendChild(receivedMessage);
        isExampleClicked = true;

        const sentMessage2 = document.createElement('div');
        sentMessage2.classList.add('message', 'sent' ,'canRemove');
        sentMessage2.textContent = '我很喜歡冰淇淋';
        chatBody.appendChild(sentMessage2);
        
        const receivedMessage2 = document.createElement('div');
        receivedMessage2.classList.add('message', 'received' ,'canRemove');
        receivedMessage2.innerHTML =`\\u6211\\u5f88\\u559c\\u6b61\\u51b0\\u6dc7\\u6dcb`;
        chatBody.appendChild(receivedMessage2);
        isExampleClicked = true;
    }
}