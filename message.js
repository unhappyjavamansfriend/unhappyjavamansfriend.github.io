var receivedErrotMessage = '無效輸入';
async function sendMessage(isAsync = false) {
    const chatBody = document.getElementById('chatBody');
    // const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (messageText === '') return;

    // Create a new message bubble for the sent message
    const sentMessage = document.createElement('div');
    sentMessage.classList.add('message', 'sent');
    sentMessage.textContent = messageText;
    chatBody.appendChild(sentMessage);

    if (isAsync) { // AES
        resultMessageArray = await resultMethod(messageText); // Async execution
    } else {
        resultMessageArray = resultMethod(messageText); // Sync execution
    }
    // Scroll to the bottom of the chat body
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Clear the input field
    messageInput.value = '';
    
    resultMessage = resultMessageArray[0]
    copyMessage = resultMessageArray[1]
    // console.log(resultMessage)
    // console.log(copyMessage)
    if(resultMessage === null || typeof resultMessage === 'undefined'){
        toastr.warning(receivedErrotMessage);
    }else{
        receivedMessage(resultMessage);
    }
}

var i = 0;
// 插到回覆框裡面隱藏，複製用
function hiddenElement(copyMessage ,receivedMessage){
    const hiddenElement = document.createElement('div');
    hiddenElement.classList.add('hidden-element' +(i++));
    hiddenElement.innerHTML = copyMessage;
    hiddenElement.style.display = 'none';
    receivedMessage.appendChild(hiddenElement);
    receivedMessage.onclick = function() {
        // 無法trim 十六進制數組
        copyText(copyMessage.trim().replace(/[ \t\r]+/g, ''));
    };
}

function receivedMessage(messageText){
    setTimeout(() => {
        const receivedMessage = document.createElement('div');
        receivedMessage.classList.add('message', 'received');
        receivedMessage.innerHTML = messageText;
        chatBody.appendChild(receivedMessage);
        
        hiddenElement(copyMessage ,receivedMessage)
        // Scroll to the bottom of the chat body
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

function resultMethod(messageText){
    var resultMessage = ''
    if(messageText === `你是誰`){
        resultMessage = `我是你爹`
    }else{
        resultMessage = messageText
    }
    return [resultMessage ,resultMessage];
}

function common_explain(receivedMessageArray){
    if(!isExplainClicked){
        receivedMessageArray.forEach((item) => {
            if(!/^\s*$/.test(item) && item !== null){
                const receivedMessage = document.createElement('div');
                receivedMessage.classList.add(class_message ,class_received ,class_canRemove);
                receivedMessage.innerHTML = item;
                chatBody.appendChild(receivedMessage);
            }
        });
        chatBody.scrollTop = chatBody.scrollHeight;
        toastr.success(toastr_success_explain);
        isExplainClicked = true;
        return;
    }
    toastr.error(toastr_error_explain);
}


function common_example(sentMessageArray ,receivedMessageArray ){
    if(!isExampleClicked){
        sentMessageArray.forEach((item, index) => {
            if(!/^\s*$/.test(item) && item !== null){
                const sentMessage = document.createElement('div');
                sentMessage.classList.add(class_message ,class_sent ,class_canRemove);
                sentMessage.textContent = item;
                chatBody.appendChild(sentMessage);
            }

            var item2 = receivedMessageArray[index];
            if(!/^\s*$/.test(item2) && item2 !== null){
                const receivedMessage = document.createElement('div');
                receivedMessage.classList.add(class_message ,class_received ,class_canRemove);
                receivedMessage.innerHTML = item2;
                chatBody.appendChild(receivedMessage);
            }
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
            if(!/^\s*$/.test(item) && item.trim() !== null){
                const receivedMessage = document.createElement('div');
                receivedMessage.classList.add(class_message ,class_received ,class_canRemove ,class_canCopy+index);
                receivedMessage.innerHTML = copy_icon+item;
                chatBody.appendChild(receivedMessage);
                receivedMessage.onclick = function() {
                    copyText(item); // Call your function here
                };
            }
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