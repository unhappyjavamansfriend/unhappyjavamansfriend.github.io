var receivedAlertMessag = '無效輸入';

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
    } else if (input.startsWith('%')) {
        try {
            return decodeURIComponent(input);
        } catch (e) {
            if (e instanceof URIError) {
                console.log(e.name);
                console.log(e.message);
                console.log(e.stack);
            }
        }
    } else if(input.startsWith("0x")) {
        var array = input.split(",");
        if (Array.isArray(array)) {
            // 判斷是否為十六進制數組
            return array.map(code => String.fromCharCode(code)).join('');
        } 
    }
    return null;
}