var receivedErrotMessag = '我沒了';
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

    var receivedMessag = resultMethod(messageText);
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

function resultMethod(){
    return receivedErrotMessag;
}

function common_explain(receivedMessageArray){
    if(!isExplainClicked){
        receivedMessageArray.forEach((item) => {
            const receivedMessage = document.createElement('div');
            receivedMessage.classList.add(class_message ,class_received ,class_canRemove);
            receivedMessage.innerHTML = item;
            chatBody.appendChild(receivedMessage);
        });
        chatBody.scrollTop = chatBody.scrollHeight;
        toastr.success(toastr_success_explain);
        isExplainClicked = true;
        return;
    }
    toastr.error(toastr_error_explain);
}


function common_example(sentMessageArray ,receivedMessageArray){
    if(!isExampleClicked){
        sentMessageArray.forEach((item, index) => {
            const sentMessage = document.createElement('div');
            sentMessage.classList.add(class_message ,class_sent ,class_canRemove);
            sentMessage.textContent = item;
            chatBody.appendChild(sentMessage);
            
            const receivedMessage = document.createElement('div');
            receivedMessage.classList.add(class_message ,class_received ,class_canRemove);
            receivedMessage.innerHTML = receivedMessageArray[index];
            chatBody.appendChild(receivedMessage);
        })
        chatBody.scrollTop = chatBody.scrollHeight;
        toastr.success(toastr_success_example);
        isExampleClicked = true;
        return;
    }
    toastr.error(toastr_error_example);
}


function common_type(receivedMessageArray){
    if(!isTypeClicked){
        receivedMessageArray.forEach((item, index) => {
            const receivedMessage = document.createElement('div');
            receivedMessage.classList.add(class_message ,class_received ,class_canRemove ,class_canCopy+index);
            receivedMessage.innerHTML = copy_icon+item;
            chatBody.appendChild(receivedMessage);
            receivedMessage.onclick = function() {
                copyText(item); // Call your function here
            };
        });
        chatBody.scrollTop = chatBody.scrollHeight;
        toastr.success(toastr_success_type);
        isTypeClicked = true;
        return;
    }
    toastr.error(toastr_error_type);
}

function copyText(item){
    navigator.clipboard.writeText(item)
        .then(() => {
            toastr.success('Content copied to clipboard!')
        })
        .catch(err => {
            toastr.error('Failed to copy')
            console.error('Failed to copy: ', err);
        });
}