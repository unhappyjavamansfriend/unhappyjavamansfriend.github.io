var receivedErrotMessage = '無效輸入';
var splitVar = "@@";

// check remove
var isExplainClicked = false;
var isExampleClicked = false;
var isTypeClicked = false;

// common class
var class_message = 'message';
var class_sent = 'sent';
var class_received = 'received';
var class_canRemove = 'canRemove';
var class_canCopy = 'canCopy';

var copy_icon = '<i class="fa-solid fa-copy"></i> ';

var toastr_info_title = "點選標題可移除說明、範例、提示詞"
var toastr_info_copy = "點選回覆可以複製內容，但不包含說明、範例、提示詞";

var toastr_success_explain = "說明已生成";
var toastr_error_explain = "說明無法重複生成";
var toastr_success_example = "範例已生成";
var toastr_error_example = "範例無法重複生成";
var toastr_success_type = "提示詞已生成，點選該提示詞可複製內容" ;
var toastr_error_type = "提示詞無法重複生成" ;