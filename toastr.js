toastr.info(toastr_info_title);

function copyText(item){
    navigator.clipboard.writeText(item)
    .then(() => {
        toastr.success( "Content copied to clipboard!" );
    })
    .catch(err => {
        toastr.error('Failed to copy');
        console.error('Failed to copy: ', err);
    });
}

isTypeClicked = true; // 大部分沒用到isTypeClicked 元素所以true先寫死關閉標題提醒用，詳見toastr.js removeEx()
function removeEx(){
    $('.message.sent.canRemove').remove();
    $('.message.received.canRemove').remove();
    if(!isExplainClicked || !isExampleClicked || !isTypeClicked){
        toastr.info(toastr_info_title);
    }
    isExplainClicked=false;
    isExampleClicked=false;
    isTypeClicked = false;
}