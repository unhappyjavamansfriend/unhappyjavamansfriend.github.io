const { key, value ,classname } = linkGroup[7]; // home script add your title
titleMessage = value[1];
common_header(titleMessage ,isHome); // some cdn

const map = new Map();
map.set(`emailSubject`,titleMessage);
map.set(`title`,`${qrcode_icon} ${titleMessage}`);
map.set(`common_intro_received`,[`QR Code (Quick Response Code，快速響應碼) 是一種 二維條碼，可以儲存資訊並快速被掃描設備解讀，例如智能手機或條碼掃描器。它由黑白方塊構成，排列在一個正方形網格內，可以儲存各種類型的數據，包括文字、網址、聯絡資訊等。`]);
// map.set(`common_example_sent`,[]);
// map.set(`common_example_received`,[]);
// map.set(`common_type123_received`,[]);
map.set('common_unittest_array' ,[
    () => sendMessage_unittest('qwe123'),
    () => sendMessage_unittest('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
])
noteMessage = `圖示相關用途如下：<br>${download_icon} ${download_icon_note}<br>`;
initContainer(map ,isHome); // body chatbody

var isUnittest = false;
function sendMessage() {
    isUnittest = false;
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();
    // Clear the input field
    messageInput.value = '';
    
    if (messageText === '') return;
    
    // Create a new message bubble for the sent message
    messageClassArray[1].push(class_usermessage)
    messageSystem(messageText ,messageClassArray[1]);
    messageClassArray[1].pop();

    resultMethod(messageText); // Sync execution
}

function resultMethod(messageText){
    const canvasTag = document.createElement('canvas');
    canvasTag.classList.add('qrcode');
    canvasTag.style.marginTop = '20px';

    QRCode.toCanvas(canvasTag, messageText, {
        width: 200,
        margin: 2,
        color: {
            dark: "#000000", // 前景色
            light: "#4CAF50" // 背景色
        }
    }, function (error) {
        if (error) console.error(error);
        console.log('QR Code generated successfully!');
    });

    const chatBody = document.getElementById('chatBody');
    const divTag = document.createElement('div');
    messageClassArray[0].forEach(classname =>{
        divTag.classList.add(classname);
    })
    if(isUnittest){
        divTag.appendChild(canvasTag);
        chatBody.appendChild(divTag);
        chatBody.scrollTop = chatBody.scrollHeight;
        return;
    }
    divTag.innerHTML = download_icon;
    divTag.style.cursor = 'pointer'; 
    
    divTag.onclick = function () {
        downloadQRCode(canvasTag);
    }
    setTimeout(() => {
        divTag.appendChild(canvasTag);
        chatBody.appendChild(divTag);
    },1000);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function downloadQRCode(canvas) {
    const link = document.createElement('a');
    link.download = `${crypto.randomUUID()}.png`; // 指定文件名
    link.href = canvas.toDataURL('image/png'); 
    link.click();
}
/** test console log start */

function sendMessage_unittest(messageText) {
    isUnittest = true;
    if (messageText === '') return;
    setTimeout(() => {
        // Create a new message bubble for the sent message
        messageClassArray[1].push(class_usermessage)
        messageSystem(messageText ,messageClassArray[1]);
        messageClassArray[1].pop();
        resultMethod(messageText); // Sync execution
    },sendMessage_unittest_time);
    sendMessage_unittest_time += 1000;
}
