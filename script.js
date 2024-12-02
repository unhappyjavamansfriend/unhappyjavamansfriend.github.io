var titleMessage = '';
var splitVar = "@@";
var isHome = false;

var isExplainClicked = false;
var isExampleClicked = false;
var isTypeClicked = false;

const class_message = 'message';
const class_sent = 'sent';
const class_usermessage = 'usermessage';
const class_received = 'received';
const class_canRemove = 'canRemove';
const class_canCopy = 'canCopy';

const copy_icon = '<i class="fa-solid fa-copy"></i> ';
const hand_pointer_icon = '<i class="fas fa-hand-pointer"></i> ';
const toastr_info_copy = `游標顯示 ${hand_pointer_icon} 表示可以複製該內容`;

const calculator_icon = '<i class="fa-solid fa-calculator"></i>';
const code_icon = '<i class="fa-solid fa-code"></i>';
const key_icon = '<i class="fa fa-key"></i>';

const explain_icon = '<i class="fa-solid fa-circle-info"></i>';
const example_icon = '<i class="fa-solid fa-pen-nib"></i>';
const type123_icon = '<i class="fa-solid fa-pen-to-square"></i>';
const removeAllMessage_icon = '<i class="fa fa-trash"></i>';

var toastr_warning_errotMessage = '無效輸入';

const toastr_success_explain = "說明已生成";
const toastr_warning_explain = "當前已有說明";
const toastr_success_example = "範例已生成";
const toastr_warning_example = "當前已有範例";
const toastr_success_type = `提示詞已生成，${hand_pointer_icon} 點選該提示詞可複製內容` ;
const toastr_warning_type = "當前已有提示詞" ;
const toastr_success_removeMessage = "對話已清除";
const toastr_warning_removeMessage = "當前沒有對話";

function common_header(titleTagValue ,isHome){
    /*<meta charset="UTF-8"></meta>
    const charsetMetaTag = document.createElement('meta');
    charsetMetaTag.setAttribute('charset', 'UTF-8');
    document.head.appendChild(charsetMetaTag);*/
    
    /*<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>*/
    const viewportMetaTag = document.createElement('meta');
    viewportMetaTag.name="viewport";
    viewportMetaTag.content="width=device-width, initial-scale=1.0";
    document.head.appendChild(viewportMetaTag);

    const titleTag = document.createElement('title');
    titleTag.innerHTML = titleTagValue;
    document.head.appendChild(titleTag);

    /*<link rel="stylesheet" href="../styles.css">*/
    if(!isHome){
        const stylesLinkTag = document.createElement('link');
        stylesLinkTag.rel = "stylesheet";
        stylesLinkTag.href = "../styles.css";
        document.head.appendChild(stylesLinkTag);
    }
    
    /*<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />*/
    const fontawesomeLinkTag = document.createElement('link');
    fontawesomeLinkTag.rel = "stylesheet";
    fontawesomeLinkTag.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css";
    fontawesomeLinkTag.integrity = "sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ==";
    fontawesomeLinkTag.crossOrigin = "anonymous";
    fontawesomeLinkTag.referrerPolicy = "no-referrer"
    document.head.appendChild(fontawesomeLinkTag);
    // <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    /*<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>*/
    // const jqueryScriptTag = document.createElement('script');
    // jqueryScriptTag.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js";
    // document.body.appendChild(jqueryScriptTag);
    
    /*toastr v2.1.4 
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.css" rel="stylesheet"/>*/
    const toastrLinkTag = document.createElement('link');
    toastrLinkTag.rel = "stylesheet";
    toastrLinkTag.href = "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.css";
    document.head.appendChild(toastrLinkTag);
    
    /*<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.js"></script>*/
    const toastrScriptTag = document.createElement('script');
    toastrScriptTag.src = "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.js";
    document.body.appendChild(toastrScriptTag);
}

function initContainer(map ,isHome){
    const containerDivTag = document.createElement('div');
    containerDivTag.classList.add('container');
    document.body.appendChild(containerDivTag);
    
    const linkareaDivTag = document.createElement('div');
    linkareaDivTag.classList.add('link-area');
    containerDivTag.appendChild(linkareaDivTag);
    
    const chatBodyDivTag = document.createElement('div');
    chatBodyDivTag.classList.add('chat-box');
    chatBodyDivTag.id = 'chatBody';
    containerDivTag.appendChild(chatBodyDivTag);
    
    const inputareaDivTag = document.createElement('div');
    inputareaDivTag.classList.add('input-area');
    containerDivTag.appendChild(inputareaDivTag);
    
    const messageInputTag = document.createElement('input');
    messageInputTag.classList.add('input-message');
    messageInputTag.id = 'messageInput';
    messageInputTag.placeholder = '輸入消息...';
    inputareaDivTag.appendChild(messageInputTag);
    
    const sendbuttonTag = document.createElement('button');
    sendbuttonTag.classList.add('send-button');
    sendbuttonTag.textContent = 'send';
    sendbuttonTag.onclick = function () {sendMessage()};
    inputareaDivTag.appendChild(sendbuttonTag);
    
    if(!isHome){
        const homeIconATag = document.createElement('a');
        homeIconATag.classList.add('icon-link');
        homeIconATag.href = '../index.html';
        linkareaDivTag.appendChild(homeIconATag);
        
        const homeIconITag = document.createElement('i');
        homeIconITag.classList.add('fas' ,'fa-home');
        homeIconATag.appendChild(homeIconITag);
        
        var icon_array = [explain_icon ,example_icon ,type123_icon ,removeAllMessage_icon];
        var function_array = [
            () => common_explain(map.get('common_explain_received')) ,
            () => common_example(map.get('common_example_sent') ,map.get('common_example_received')) ,
            () => common_type123(map.get('common_type123_received')) ,
            () => removeAllMessage()
        ]
    
        function_array.forEach((item ,index) => {
            if(!map.has('common_type123_received') && index === 2) return;
            const iconfunctionATag = document.createElement('a');
            iconfunctionATag.classList.add('icon-link');
            iconfunctionATag.innerHTML = icon_array[index];
            iconfunctionATag.onclick = function () {item() };
            linkareaDivTag.appendChild(iconfunctionATag);
        })
    
        linkareaDivTag.appendChild(document.createElement('br'));
        linkareaDivTag.appendChild(document.createElement('br'));
        
        const titleDivTag = document.createElement('div');
        titleDivTag.innerHTML = map.get('title');
        linkareaDivTag.appendChild(titleDivTag);

    }else{
        var titleArray = [`請依照個人需要， ${hand_pointer_icon} 點選下方相關標題`,
                        `${calculator_icon}  <a href="calculateArea/index.html">無懼挑戰，精準換算公分與坪數！</a>`,
                        `${code_icon}  <a href="convertHexadecimalToChinese/index.html">字符解析大作戰，十六進制的全景探索！</a>`,
                        `${code_icon}  <a href="convertUnicodeToChinese/index.html">破解編碼之謎，Unicode 揭開字符轉換的神秘面紗！</a>`,
                        `${code_icon}  <a href="convertURLToChinese/index.html">解密編碼世界，掌握字符解析 URL！</a>`,
                        `${key_icon}  <a href="MD5/index.html">不可逆的信任之鎖， MD5 數據校驗的極致力量！</a>`,
                        `${key_icon}  <a href="AES/index.html">閃電與鋼鐵的碰撞，AES 高速加密的無雙神器！</a>`,
        ];
        titleArray.forEach(item => {
            const toolDivTag = document.createElement('div');
            toolDivTag.classList.add(class_message, class_received);
            toolDivTag.innerHTML = item;
            chatBodyDivTag.appendChild(toolDivTag);
        })
    }
}

function sendMessage() {
    const chatBody = document.getElementById('chatBody');
    // const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (messageText === '') return;

    // Create a new message bubble for the sent message
    const sentMessageDivTag = document.createElement('div');
    sentMessageDivTag.classList.add(class_message, class_sent ,class_usermessage);
    sentMessageDivTag.textContent = messageText;
    chatBody.appendChild(sentMessageDivTag);

    resultMessageArray = resultMethod(messageText); // Sync execution
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
function hiddenElement(copyMessage ,receivedMessageDivTag){
    const hiddenElementDivTag = document.createElement('div');
    hiddenElementInteger++
    hiddenElementDivTag.classList.add('hidden-element'+hiddenElementInteger);
    hiddenElementDivTag.innerHTML = copyMessage;
    hiddenElementDivTag.style.display = 'none';
    receivedMessageDivTag.appendChild(hiddenElementDivTag);
    receivedMessageDivTag.onclick = function() {
        // 無法trim 十六進制數組
        copyText(copyMessage.trim().replace(/[ \t\r]+/g, ''));
    };
}

var receivedInteger = 0; //回覆訊息copy用
function receivedMessage(messageText){
    setTimeout(() => {
        const receivedMessageDivTag = document.createElement('div');
        receivedInteger++;
        // console.log(`receivedInteger:${receivedInteger}`)
        receivedMessageDivTag.classList.add(class_message, class_received ,class_canCopy+receivedInteger);
        receivedMessageDivTag.innerHTML = messageText;
        chatBody.appendChild(receivedMessageDivTag);
        
        hiddenElement(copyMessage ,receivedMessageDivTag)
        // Scroll to the bottom of the chat body
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

function resultMethod(messageText){
    return [messageText ,messageText];
}

function common_explain(receivedMessageArray){
    const chatBody = document.getElementById('chatBody');
    if(!isExplainClicked){
        receivedMessageArray.unshift(toastr_info_copy);
        receivedMessageArray.forEach((item) => {
            if(!/^\s*$/.test(item) && item !== null){
                const receivedMessageDivTag = document.createElement('div');
                receivedMessageDivTag.classList.add(class_message ,class_received ,class_canRemove);
                receivedMessageDivTag.innerHTML = item;
                chatBody.appendChild(receivedMessageDivTag);
            }
        });
        receivedMessageArray.shift();
        chatBody.scrollTop = chatBody.scrollHeight;
        isExplainClicked = true;
        toastr.success(toastr_success_explain);
        return;
    }
    toastr.warning(toastr_warning_explain);
}

function common_example(sentMessageArray ,receivedMessageArray ){
    const chatBody = document.getElementById('chatBody');
    if(!isExampleClicked){
        sentMessageArray.forEach((item, index) => {
            if(!/^\s*$/.test(item) && item !== null){
                const sentMessageDivTag = document.createElement('div');
                sentMessageDivTag.classList.add(class_message ,class_sent ,class_canRemove);
                sentMessageDivTag.textContent = item;
                chatBody.appendChild(sentMessageDivTag);
            }

            var item2 = receivedMessageArray[index];
            if(!/^\s*$/.test(item2) && item2 !== null){
                const receivedMessageDivTag = document.createElement('div');
                receivedMessageDivTag.classList.add(class_message ,class_received ,class_canRemove);
                receivedMessageDivTag.innerHTML = item2;
                chatBody.appendChild(receivedMessageDivTag);
            }
        })
        chatBody.scrollTop = chatBody.scrollHeight;
        isExampleClicked = true;
        toastr.success(toastr_success_example);
        return;
    }
    toastr.warning(toastr_warning_example);
}

function common_type123(receivedMessageArray){
    const chatBody = document.getElementById('chatBody');
    if(!isTypeClicked && receivedMessageArray !== null){
        receivedMessageArray.forEach((item, index) => {
            if(!/^\s*$/.test(item) && item.trim() !== null){
                const receivedMessageDivTag = document.createElement('div');
                receivedMessageDivTag.classList.add(class_message ,class_received ,class_canRemove ,class_canCopy+index);
                receivedMessageDivTag.innerHTML = copy_icon+item;
                chatBody.appendChild(receivedMessageDivTag);
                receivedMessageDivTag.onclick = function() {
                    copyText(item); // Call your function here
                };
                receivedInteger = index;
                // console.log(`common_type count:${receivedInteger}`)
            }
        });
        chatBody.scrollTop = chatBody.scrollHeight;
        isTypeClicked = true;
        toastr.success(toastr_success_type);
        return;
    }
    toastr.warning(toastr_warning_type);
}

function copyText(item){
    navigator.clipboard.writeText(item)
        .then(() => {
            toastr.success(`Content "${item}" copied to clipboard!`)
        })
        .catch(err => {
            toastr.warning('Failed to copy')
            console.error('Failed to copy: ', err);
        });
}

function removeAllMessage(){
    const chatBody = document.getElementById('chatBody');
    if(chatBody.textContent === ''){
        toastr.warning(toastr_warning_removeMessage);
        return;
    }
    // 移除說明、範例、使用者對話內容
    chatBody.textContent = '';
    toastr.success(toastr_success_removeMessage);
    isExplainClicked = false;
    isExampleClicked = false;
    isTypeClicked = false;
}