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

// 將十六進制數組轉換為字符串
function convertToChinese(input) {
    if(input.match(/0x[0-9A-Fa-f]+/g)) {
        var array = input.split(",");
        if (Array.isArray(array)) {
            return array.map(code => String.fromCharCode(code)).join('');
        }
    }else{
        return stringToHexArray(input);
    }
    return null;
}

// 將字符串轉換為十六進制數組
function stringToHexArray(input) {
    return Array.from(input).map(char => '0x'+char.charCodeAt(0).toString(16).padStart(2, '0'));
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
        receivedMessage.innerHTML = `十六進制是一種數字系統，使用 0-9 和 A-F 來表示數字。在計算機科學中，十六進制常用於表示字節值或顏色值。每個十六進制數字代表四個二進制位（bit），因此兩個十六進制數字可以表示一個字節（8 位）`;
        chatBody.appendChild(receivedMessage);
        isExplainClicked = true;
    }
}

function example(){
    if(!isExampleClicked){
        const sentMessage = document.createElement('div');
        sentMessage.classList.add('message', 'sent' ,'canRemove');
        sentMessage.textContent = `0x6211,0x5F88,0x559C,0x6B61`;
        chatBody.appendChild(sentMessage);
        
        const receivedMessage = document.createElement('div');
        receivedMessage.classList.add('message', 'received' ,'canRemove');
        receivedMessage.innerHTML =`我很喜歡`;
        chatBody.appendChild(receivedMessage);

        const sentMessage2 = document.createElement('div');
        sentMessage2.classList.add('message', 'sent' ,'canRemove');
        sentMessage2.textContent = `冰淇淋`;
        chatBody.appendChild(sentMessage2);
        
        const receivedMessage2 = document.createElement('div');
        receivedMessage2.classList.add('message', 'received' ,'canRemove');
        receivedMessage2.innerHTML =`0x51b0,0x6dc7,0x6dcb`;
        chatBody.appendChild(receivedMessage2);
        isExampleClicked = true;
    }
}
