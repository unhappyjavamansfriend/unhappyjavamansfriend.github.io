var receivedAlertMessag = '我沒了';

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

    // Scroll to the bottom of the chat body
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Clear the input field
    messageInput.value = '';
    receivedMessage(receivedAlertMessag);
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