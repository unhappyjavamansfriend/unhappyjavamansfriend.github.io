window.SharedContent = {
    hrefArray: [
        {key: "home,back" ,decribe: "返回首頁"},
        {key: "wtf,retrieval,points" ,decribe: "相關訊息"},
        {key: "ex,sample,test" ,decribe: "範例"},
        {key: "rm,remove,clear" ,decribe: "清除所有訊息"},
        {key: "feedback" ,decribe: "反饋問題"},
    ],

    comment2:[],

    addcomment2: () => {
        window.SharedContent.comment2.push({ text: "搜尋其他功能類的關鍵字：", type: "received" });
        window.SharedContent.hrefArray.forEach(item => {
            window.SharedContent.comment2.push({text: `${item.decribe} 請輸入 '${item.key}'`, type: "received" })
        })
    },

    scrollToBottom: (elementId) => {
        const chatBody = document.getElementById(elementId);
        if (chatBody) {
            chatBody.scrollTop = chatBody.scrollHeight; // 滾動到底部
        }
    },

    handleCopy: (text) => {
        const plainText = text.replace(/<br>/g, "\n"); // 將 HTML 換行轉為普通換行
        navigator.clipboard.writeText(plainText)
            .then(() => toastr.success("訊息已複製！"))
            .catch(() => toastr.waining("複製失敗，請重試！"));
    },

    sendEmail: (subject, setMessages) => {
        if (typeof subject !== "string") {
            console.error("Invalid subject provided to sendEmail:", subject);
            return; // 提前退出，避免錯誤
        }
        const emailSubject = `我想針對[unhappyjavamansfriend.github.io]的"${subject.replaceAll('<br>',' ')}"提出一些反饋`;
        const body = `(請勿修改主題)以下是我的反饋內容：`;
        window.location.href = `mailto:oldfe01@outlook.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`;
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: "感謝您的反饋！我們已經準備好接收您的意見。", type: "received" }
            ]);
        }, 1000); // 模擬延遲回覆
    },

    resultMethod: (inputMessage ,istest) =>{
    },

    handleSendMessage: (subject, inputMessage, setMessages, setInputMessage ,
        pointMessages, exampleMessages, testMessages) => {
        if (inputMessage === '') {
            toastr.warning("Empty message!"); // 顯示警告訊息
            return; // 中斷後續執行
        }
            
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: inputMessage, type: "sent" }
        ]);
    
        if(inputMessage === "home" || inputMessage === "back"){
            window.location.href = 'index.html';
    
        }else if (inputMessage === "feedback") {
            window.SharedContent.sendEmail(subject, setMessages);
    
        } else if (inputMessage === "rm" || inputMessage === "remove" || inputMessage === "clear") {
            setMessages([]); // 清除訊息列表
    
        } else if (inputMessage === "wtf" || inputMessage === "retrieval" || inputMessage === "points") {
            pointMessages.forEach((msg) => {
                setTimeout(() => {
                    setMessages((prevMessages) => [...prevMessages, msg]);
                }, 1000);
            });
            
        } else if (inputMessage === "sample" || inputMessage === "ex" || inputMessage === "test") {
            if(exampleMessages.length !== 0){
                exampleMessages.forEach((msg, index) => {
                    setTimeout(() => {
                        setMessages((prevMessages) => [...prevMessages, msg]);
                        window.SharedContent.resultMethod(testMessages[index]  ,true);
                    }, 1500 * (index + 1));
                });

            }else{
                testMessages.forEach((msg, index) => {
                    setTimeout(() => {
                        window.SharedContent.resultMethod(testMessages[index]  ,true);
                    }, 1500 * (index + 1));
                });

            }
        } else {
            window.SharedContent.resultMethod(inputMessage ,false);
        }
        
        setInputMessage(""); // 清空輸入框
    }
};