var splitVar = "@@";

// check remove
var isExplainClicked = false;
var isExampleClicked = false;
var isTypeClicked = false;

// common class
var class_message = 'message';
var class_sent = 'sent';
var class_usermessage = 'usermessage';
var class_received = 'received';
var class_canRemove = 'canRemove';
var class_canCopy = 'canCopy';

var copy_icon = '<i class="fa-solid fa-copy"></i> ';
var hand_pointer_icon = '<i class="fas fa-hand-pointer"></i> ';

var toastr_info_copy = `游標顯示 ${hand_pointer_icon} 表示可以複製該內容`;

var toastr_warning_errotMessage = '無效輸入';

var toastr_success_explain = "說明已生成";
var toastr_warning_explain = "當前已有說明";
var toastr_success_example = "範例已生成";
var toastr_warning_example = "當前已有範例";
var toastr_success_type = `提示詞已生成，${hand_pointer_icon} 點選該提示詞可複製內容` ;
var toastr_warning_type = "當前已有提示詞" ;
var toastr_success_removeMessage = "對話已清除";

async function sendMessage(isAsync = false) {
    const chatBody = document.getElementById('chatBody');
    // const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (messageText === '') return;

    // Create a new message bubble for the sent message
    const sentMessage = document.createElement('div');
    sentMessage.classList.add(class_message, class_sent ,class_usermessage);
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
        toastr.warning(toastr_warning_errotMessage);
    }else{
        receivedMessage(resultMessage);
    }
}

// 插到回覆框裡面隱藏，複製用
var hiddenElementInteger = 0; 
function hiddenElement(copyMessage ,receivedMessage){
    const hiddenElement = document.createElement('div');
    hiddenElementInteger++
    hiddenElement.classList.add('hidden-element'+hiddenElementInteger);
    hiddenElement.innerHTML = copyMessage;
    hiddenElement.style.display = 'none';
    receivedMessage.appendChild(hiddenElement);
    receivedMessage.onclick = function() {
        // 無法trim 十六進制數組
        copyText(copyMessage.trim().replace(/[ \t\r]+/g, ''));
    };
}
var receivedInteger = 0; //回覆訊息copy用
function receivedMessage(messageText){
    setTimeout(() => {
        const receivedMessage = document.createElement('div');
        receivedInteger++;
        // console.log(`receivedInteger:${receivedInteger}`)
        receivedMessage.classList.add(class_message, class_received ,class_canCopy+receivedInteger);
        receivedMessage.innerHTML = messageText;
        chatBody.appendChild(receivedMessage);
        
        hiddenElement(copyMessage ,receivedMessage)
        // Scroll to the bottom of the chat body
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

function resultMethod(messageText){
    return [messageText ,messageText];
}

function common_explain(receivedMessageArray){
    if(!isExplainClicked){
        receivedMessageArray.unshift(toastr_info_copy);
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
    toastr.warning(toastr_warning_explain);
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
    toastr.warning(toastr_warning_example);
}

var typeCount = false;
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
                receivedInteger = index;
                // console.log(`common_type count:${receivedInteger}`)
            }
        });
        typeCount = true;
        chatBody.scrollTop = chatBody.scrollHeight;
        toastr.success(toastr_success_type);
        isTypeClicked = true;
        return;
    }
    toastr.warning(toastr_warning_type);
}

function copyText(item){
    navigator.clipboard.writeText(item)
        .then(() => {
            toastr.success('Content copied to clipboard!')
        })
        .catch(err => {
            toastr.warning('Failed to copy')
            console.error('Failed to copy: ', err);
        });
}

isTypeClicked = true; // 大部分沒用到isTypeClicked 元素所以true先寫死關閉標題提醒用，詳見toastr.js canRemoveMessage()
function removeAllMessage(){
    // 移除說明、範例
    $('.message.sent.canRemove').remove();
    $('.message.received.canRemove').remove();

    // 使用者對話內容
    $('.message.sent.usermessage').remove();
    // console.log(typeCount);
    if(typeCount){
        while(receivedInteger > 3){
            // console.log(`a:${receivedInteger}`)
            $(`.message.received.canCopy${receivedInteger}`).remove();
            receivedInteger--;
        }
    }else{
        while(receivedInteger > 0){
            // console.log(`b:${receivedInteger}`)
            $(`.message.received.canCopy${receivedInteger}`).remove();
            receivedInteger--;
        }
    }
    toastr.success(toastr_success_removeMessage);
    isExplainClicked=false;
    isExampleClicked=false;
    isTypeClicked = false;
}