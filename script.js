var titleMessage = '';
var splitVar = "@@";
var isHome = false;

var isCommentClicked = false;
var isIntroClicked = false;
var isExampleClicked = false;
var isTypeClicked = false;
var isTestClicked = false;
var isTestStop = false;

const class_message = 'message';
const class_sent = 'sent';
const class_usermessage = 'usermessage';
const class_received = 'received';
const class_canRemove = 'canRemove';
var class_canCopy = 'canCopy';
const class_calculatorIcon = 'calculatorIcon';
const class_codeIcon = 'codeIcon';
const class_keyIcon = 'keyIcon';
const class_qrcodeIcon = 'qrcodeIcon';

const copy_icon = '<i class="fa-solid fa-copy"></i> ';
const hand_pointer_icon = '<i class="fas fa-hand-pointer"></i> ';
const download_icon = '<i class="fa-solid fa-download"></i> ';

const calculator_icon = '<i class="fa-solid fa-calculator"></i>';
const code_icon = '<i class="fa-solid fa-code"></i>';
const key_icon = '<i class="fa fa-key"></i>';
const qrcode_icon = '<i class="fa-solid fa-qrcode"></i>';

const comment_icon = '<i class="fa-solid fa-mug-hot"></i>';
const intro_icon = '<i class="fa-solid fa-circle-info"></i>';
const example_icon = '<i class="fa-solid fa-pen-nib"></i>';
const type123_icon = '<i class="fa-solid fa-pen-to-square"></i>';
const removeAllMessage_icon = '<i class="fa fa-trash"></i>';
const unittest_icon = '<i class="fa-solid fa-vial-virus"></i>';
const email_icon = '<i class="fa-solid fa-envelope"></i>';

const D_icon = '<i class="fa-solid fa-d"></i>';
const E_icon = '<i class="fa-solid fa-e"></i>';
const list_icon = '<i class="fa-solid fa-list"></i>';
const toastr_success_encryptData = `加密成功`;
const toastr_success_decryptData = `解密成功`;
const toastr_warning_encryptData = `點選 ${E_icon} 進行加密`;
const toastr_warning_decryptData = `點選 ${D_icon} 進行解密`;

var toastr_warning_errotMessage = '無效輸入';

const download_icon_note = "下載";
const copy_icon_note = "複製內容";
const comment_icon_note = "圖示說明";
const intro_icon_note = "知識點";
const example_icon_note = "範例";
const type_icon_note = "關鍵詞";
const removeMessage_icon_note = "清除對話";
const unittest_icon_note = "進行測試";
const email_icon_note = "反饋問題";

const toastr_success_comment = "圖示說明已生成";
const toastr_warning_comment = "當前已有圖示說明";
const toastr_success_intro = "本篇知識點已生成";
const toastr_warning_intro = "當前已有知識點";
// const toastr_success_example = "範例已生成";
// const toastr_warning_example = "當前已有範例";
const toastr_success_type = `關鍵詞已生成，${hand_pointer_icon} 點選該關鍵詞可複製內容` ;
const toastr_warning_type = "當前已有關鍵詞" ;
const toastr_success_removeMessage = "對話已清除";
const toastr_warning_removeMessage = "當前沒有對話";
const dividingLine = `－－ － － －我是分隔線－ － － －－`;
const toastr_success_unittest = "測試已生成";
const toastr_warning_unittest = "當前項目已進行測試" ;
const toastr_success_email = "反饋信件已生成";

// 主要紀錄當前功能數量用，還是較推薦 map(key ,array) 比較好辨識
const linkGroup = [
    {//0
        key: "calculateArea",
        value: [calculator_icon ,'無懼挑戰，精準換算公分與坪數！'],
        classname: class_calculatorIcon
    },
    {
        key: "convertHexadecimalToChinese",
        value: [code_icon ,'字符解析大作戰，十六進制的全景探索！'],
        classname: class_codeIcon
    },
    {
        key: "convertUnicodeToChinese",
        value: [code_icon ,'Unicode 揭開字符轉換的神秘面紗！'],
        classname: class_codeIcon
    },
    {
        key: "convertURLToChinese",
        value: [code_icon ,'解密編碼世界，掌握字符解析 URL！'],
        classname: class_codeIcon
    },
    {
        key: "MD5",
        value: [key_icon ,'不可逆的信任之鎖， MD5 數據校驗的極致力量！'],
        classname: class_keyIcon
    },
    {//5
        key: "AES",
        value: [key_icon ,'閃電與鋼鐵的碰撞，AES-GCM 高速加密的無雙神器！'],
        classname: class_keyIcon
    },
    {
        key: "RSA",
        value: [key_icon ,'數據的守護者，RSA-OAEP 非對稱加密的絕對防線！'],
        classname: class_keyIcon
    },
    {
        key: "qrcode",
        value: [qrcode_icon ,'連接世界的橋樑，QR Code 數位化未來的象徵！'],
        classname: class_qrcodeIcon
    },
]

let messageClassArray = [
    [class_message ,class_received],
    [class_message ,class_sent],
    [class_message ,class_sent ,class_usermessage],
    [] // hidden
]

let sendMessage_unittest_time = 1000;

function home_icon(){
    var iconArray = [
        { 
            icon: calculator_icon,
            classname: class_calculatorIcon
        },
        { 
            icon: code_icon,
            classname: class_codeIcon
        },
        { 
            icon: key_icon,
            classname: class_keyIcon
        },
        { 
            icon: qrcode_icon,
            classname: class_qrcodeIcon
        },
    ];
    const linkareaDivTag = document.querySelector('.link-area');
    iconArray.forEach(({icon ,classname}) => {
        const iconfunctionATag = document.createElement('a');
        iconfunctionATag.classList.add('icon-link');
        iconfunctionATag.innerHTML = icon;
        iconfunctionATag.onclick = function () {
            const aTags = document.querySelectorAll(`.${classname}`);
            aTags.forEach(aTag => {
                // 切换每个元素的显示状态
                if (aTag.style.display === "none") {
                    aTag.style.display = "block"; // 显示
                } else {
                    aTag.style.display = "none";  // 隐藏
                }
            });
        };
        linkareaDivTag.appendChild(iconfunctionATag);
    })
}

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

var noteMessage = `圖示相關用途如下：<br>${copy_icon} ${copy_icon_note}<br>`;
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
        
        var icon_array = [
            [comment_icon ,comment_icon_note] ,
            [intro_icon ,intro_icon_note] ,
            [example_icon ,unittest_icon_note] ,
            // [example_icon ,example_icon_note] ,
            [type123_icon ,type_icon_note] ,
            [removeAllMessage_icon ,removeMessage_icon_note] ,
            [email_icon ,email_icon_note]
        ];

        var function_array = [
            () => common_comment() ,
            () => common_intro(map.get('common_intro_received')) ,
            () => common_unittest(map.get('common_unittest_array')),
            // () => common_example(map.get('common_example_sent') ,map.get('common_example_received')) ,
            () => common_type123(map.get('common_type123_received')) ,
            () => removeAllMessage(),
            (tag) => common_email(map.get('emailSubject'), tag)
        ]

        function_array.forEach((item ,index) => {
            // if((!map.has('common_example_sent') && !map.has('common_example_received'))
            //      && index === 2) return;
            if(!map.has('common_type123_received') && index === 3) return;
            const iconfunctionATag = document.createElement('a');
            iconfunctionATag.classList.add('icon-link');
            iconfunctionATag.innerHTML = icon_array[index][0];
            iconfunctionATag.onclick = function () {
                if( index === 5){ //mail
                    item(iconfunctionATag)
                }else{
                    item()
                } 
            };
            noteMessage += `${icon_array[index][0]} ${icon_array[index][1]}<br>`
            linkareaDivTag.appendChild(iconfunctionATag);
        })
        messageSystem(noteMessage);
    
        linkareaDivTag.appendChild(document.createElement('br'));
        linkareaDivTag.appendChild(document.createElement('br'));
        
        const titleDivTag = document.createElement('div');
        titleDivTag.innerHTML = map.get('title');
        linkareaDivTag.appendChild(titleDivTag);

    }else{

        messageSystem(`請依照個人需要， ${hand_pointer_icon} 點選相關主題`);
        linkGroup.forEach(({key ,value ,classname}) => {
            messageClassArray[0].push(classname);
            const divTag = messageSystem(value[0]);
            divTag.style.display = "none"; 
            messageClassArray[0].pop();

            const toolATag = document.createElement('a');
            toolATag.href = key + '/index.html';
            toolATag.innerHTML = ` ${value[1]}`;
            divTag.appendChild(toolATag);
        })
    }
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();
    // Clear the input field
    messageInput.value = '';
    
    if (messageText === '') return;
    
    // Create a new message bubble for the sent message
    messageClassArray[1].push(class_usermessage)
    messageSystem(messageText ,messageClassArray[1]);
    messageClassArray[1].pop();

    let resultMessageArray = resultMethod(messageText); // Sync execution
    // console.log(`2d:${is2DArray(resultMessageArray)}`);
    
    if(resultMessageArray === null){
        receivedMessage(null);
        return;
    }

    if(is2DArray(resultMessageArray)){
        // receivedMessage(dividingLine);
        resultMessageArray.forEach(item =>{
            receivedMessage(`${item[0]}：<br>${item[1]}` ,item[1]);
        });
        // receivedMessage(dividingLine);
        return;
    }
    
    resultMessage = resultMessageArray[0]
    copyMessage = resultMessageArray[1]

    // console.log(resultMessage)
    // console.log(copyMessage)
    if(resultMessage === null || typeof resultMessage === 'undefined'){
        receivedMessage(null);
        return;
    }

    // console.log(`common sendMessage resultMessage=${resultMessage}`)
    receivedMessage(resultMessage ,copyMessage);

}

// 判斷二維，多筆資料用
function is2DArray(array) {
    return Array.isArray(array) && array.every(item => Array.isArray(item));
}

var hiddenElementInteger = 0; 
function hiddenElement(messageText ,divTag){
    // messageClassArray[3] = []; // 初始化
    messageClassArray[3].push('hidden-element'+hiddenElementInteger);
    const hiddenDivTag = messageSystem(messageText ,messageClassArray[2]);
    hiddenDivTag.style.display = 'none';
    messageClassArray[3].pop();
    divTag.appendChild(hiddenDivTag);
    divTag.onclick = function() {
        copyText(messageText);
    };
    hiddenElementInteger++
}

var receivedInteger = 0; //回覆訊息copy用
function receivedMessage(messageText ,copyMessage){
    // console.log(`messageText:${messageText}`)
    // console.log(`copyMessage:${copyMessage}`)
    setTimeout(() => {
        if(messageText === null){
            messageSystem(null);
        }else{
            receivedInteger++;
            if(typeof copyMessage === 'undefined'){
                class_canCopy = 'cantCopy'
            }
            messageClassArray[0].push(class_canCopy+receivedInteger);
            const divTag = messageSystem(copy_icon + messageText);
            messageClassArray[0].pop();
            // console.log(`messageClassArray[0]=${messageClassArray[0]}`)
            if(typeof copyMessage !== 'undefined'){
                hiddenElement(copyMessage.replaceAll('<br>','').replace(/[ \t\r]+/g, '') ,divTag)
            }
        }
        // Scroll to the bottom of the chat body
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

function messageSystem(item ,classArray){
    if(typeof classArray === 'undefined'){ // 預設
        classArray = messageClassArray[0];
    }
    const chatBody = document.getElementById('chatBody');
    const divTag = document.createElement('div');
    classArray.forEach(classname =>{
        divTag.classList.add(classname);
    })
    if(item === null){
        item = toastr_warning_errotMessage
    }
    divTag.innerHTML = item;
    chatBody.appendChild(divTag);
    chatBody.scrollTop = chatBody.scrollHeight;
    return divTag;
}

function resultMethod(){
    return [];
}

/**icon html start*/
function common_comment(){
    if(!isCommentClicked){
        messageSystem(noteMessage);
        isCommentClicked = true;
        toastr.success(toastr_success_comment);
        return;
    }
    toastr.warning(toastr_warning_comment);
}

function common_intro(r_commonArray){
    if(!isIntroClicked 
        && r_commonArray !== null
        && typeof r_commonArray !== 'undefined'
    ){
        r_commonArray.forEach((item) => {
            if(!/^\s*$/.test(item) && item !== null){
                messageSystem(item);
            }
        });
        isIntroClicked = true;
        toastr.success(toastr_success_intro);
        return;
    }
    toastr.warning(toastr_warning_intro);
}

// function common_example(s_commonArray ,r_commonArray ){
//     if(!isExampleClicked 
//         && (s_commonArray !== null || r_commonArray !== null)
//         && (typeof s_commonArray !== 'undefined' || typeof r_commonArray !== 'undefined')
//     ){
//         s_commonArray.forEach((item, index) => {
//             if(!/^\s*$/.test(item) && item !== null){
//                 messageSystem(item ,messageClassArray[1]);
//             }

//             var item2 = r_commonArray[index];
//             if(!/^\s*$/.test(item2) && item2 !== null){
//                 messageSystem(item2);
//             }
//         })
//         isExampleClicked = true;
//         toastr.success(toastr_success_example);
//         return;
//     }
//     toastr.warning(toastr_warning_example);
// }

function common_type123(r_commonArray){
    if(!isTypeClicked 
        && r_commonArray !== null
        && typeof r_commonArray !== 'undefined'
    ){
        r_commonArray.forEach((item, index) => {
            if(!/^\s*$/.test(item) && item.trim() !== null){
                messageClassArray[0].push(class_canCopy+index)
                const divTag = messageSystem(copy_icon + item)
                divTag.onclick = function() {
                    copyText(item); // Call your function here
                };
                messageClassArray[0].pop();
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

function common_unittest(item){
    if(!isTestClicked){
        item.forEach(e =>{ e() })
        setTimeout(() => {
            toastr.success(toastr_success_unittest);
        },1000);
        isTestClicked = true;
        return;
    }
    toastr.warning(toastr_warning_unittest);
}

function common_email(emailSubject ,iconfunctionATag){
    const subject = `我想針對[unhappyjavamansfriend.github.io]的"${emailSubject}"提出一些反饋`
    const body = `(請勿修改主題)以下是我的反饋內容：`
    iconfunctionATag.href = `mailto:oldfe01@outlook.com?subject=${subject}&body=${body}`
    toastr.success(toastr_success_email);
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
    isCommentClicked = false;
    isIntroClicked = false;
    isExampleClicked = false;
    isTypeClicked = false;
    isTestClicked = false;
    sendMessage_unittest_time = 1000; 
    // isTestStop = true;
    // setTimeout(() => {isTestStop = false; },10000);
    // console.log(`removeAllMessage isTestStop:${isTestStop}`)
}

/** unittest */
function sendMessage_unittest(messageText) {
    // console.log(`sendMessage_unittest isTestStop:${isTestStop}`)
    // if(isTestStop){
    //     toastr.warning(`測試已停止`);
    //     return;
    // }
    setTimeout(() => {
        messageSystem(messageText ,messageClassArray[1])
        
        // let resultMessageArray = resultMethodWithConsolelog(messageText);
        let resultMessageArray = resultMethod(messageText);
        
        // console.log(`2d:${is2DArray(resultMessageArray)}`);
        class_canCopy = 'cantCopy';
        if(resultMessageArray === null){
            messageSystem(null);
            return;
        }
        
        if(is2DArray(resultMessageArray)){
            // receivedMessage(dividingLine);
            resultMessageArray.forEach(item =>{
                messageSystem(`${item[0]}：<br>${item[1]}`);
            });
            // receivedMessage(dividingLine);
            return;
        }
        
        resultMessage = resultMessageArray[0]
        // console.log(resultMessage)
        if(resultMessage === null || typeof resultMessage === 'undefined'){
            messageSystem(null);
            return;
        }
        // console.log(`common sendMessage resultMessage=${resultMessage}`)
        messageSystem(resultMessage);
    },sendMessage_unittest_time);
    sendMessage_unittest_time += 1000;
}