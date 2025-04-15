

$(".yt-card").on("click", (e) => {
    var targetId = "";
    if(e.target.id.length){
        targetId = e.target.id;
    }
    else if(e.target.parentElement.id){
        targetId = e.target.parentElement.id;
    }
    else if(e.target.parentElement.parentElement.id){
        targetId = e.target.parentElement.parentElement.id;
    }
    else if(e.target.parentElement.parentElement.parentElement.id){
        targetId = e.target.parentElement.parentElement.parentElement.id;
    }
    else if(e.target.parentElement.parentElement.parentElement.parentElement.id){
        targetId = e.target.parentElement.parentElement.parentElement.parentElement.id;
    }
    else if(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id){
        targetId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
    }
    // console.log(targetId.length);
    btn_choose_mode = targetId;
    $("#upload_img").click();
});
var mode = {
    "inch1": {
        "width": 331,
        "height": 413,
        "each_width": 360,
        "each_height": 600
    },
    "inch2_body": {
        "width": 496,
        "height": 555,
        "each_width": 600,
        "each_height": 600
    },
    "inch2_head": {
        "width": 413,
        "height": 532,
        "each_width": 450,
        "each_height": 600
    },
    "usa": {
        "width": 591,
        "height": 591,
        "each_width": 600,
        "each_height": 600
    }
}
// inch1 || inch2_body || inch2_head || usa
var btn_choose_mode = "";
var rotate_count = 0;
function canvas_draw() {
    // inch1
    var width_crop = mode[btn_choose_mode].width;
    var height_crop = mode[btn_choose_mode].height;
    var each_width = mode[btn_choose_mode].each_width;
    var each_height = mode[btn_choose_mode].each_height;

    $("#yc").html(`<canvas id="canvas" width="1800" height="1200" style="display:none;"></canvas><a id="save_href"><img id="save_img"></a><canvas id="canvas2" width="1800" height="1200" style="display:none;"></canvas><a id="save_href2"><img id="save_img2"></a>`);
    var ctx = document.getElementById('canvas').getContext('2d');
    var crop = document.getElementsByTagName('canvas')[2];

    // single image
    $("#canvas2").attr("width", `${width_crop*5}px`);
    $("#canvas2").attr("height", `${height_crop*5}px`);
    var ctx2 = document.getElementById('canvas2').getContext('2d');
    ctx2.drawImage(crop, 0, 0, width_crop*5, height_crop*5);

    var saveHref2 = document.getElementById("save_href2");
    var save_img2 = document.getElementById("save_img2");
    var fileName2 = 'GoldenYears_' + getDateTime(new Date());
    
    var tempSrc2 = canvas2.toDataURL("image/jpeg");
    saveHref2.href = tempSrc2;
    save_img2.src = tempSrc2;
    // console.log(save_img.src)
    // $("canvas").hide();

    let blobObj2 = dataURItoBlob(save_img2.src);
    let blobUrl2 = URL.createObjectURL(blobObj2);
    save_img2.src = blobUrl2;
    saveHref2.href = blobUrl2;
    $("#save_href2").attr('download', fileName2);
    $("#save_href2").after(`<br><p>ibon 4x6相片列印：手機下載OPEN POINT APP，選擇行動列印->圖片列印，按照操作說明，即可ibon取件編號。</p>`);
    $("#save_href2").after(`<p>（點擊圖片即可下載）</p>`);
    $("#save_href2").after(`<p>手機若無法下載時請嘗試改用Chrome瀏覽器開啟</p>`);
    // single image

    ctx.setLineDash([3, 4]);
    ctx.lineWidth = 2;
    randomColor = ['#f36', '#f63', '#3f6', '#6f3', '#36f', '#63f'];
    ctx.strokeStyle = randomColor[parseInt(Math.random() * 7)];
    for (var i = 0; i < 5; i++) {
        // console.log(i * each_width, width_crop)
        ctx.drawImage(crop, i * each_width, 0, width_crop, height_crop);
        ctx.drawImage(crop, i * each_width, 1200 - height_crop, width_crop, height_crop);
    }
    
    for (var i = 0; i < 5; i++) {
        // left line
        // first row
        ctx.beginPath();
        ctx.moveTo(each_width * i - 2, 0);
        ctx.lineTo(each_width * i - 2, height_crop + 2);
        ctx.stroke();
        // second row
        ctx.beginPath();
        ctx.moveTo(each_width * i - 2, 1200);
        ctx.lineTo(each_width * i - 2, 1200 - height_crop - 2);
        ctx.stroke();
        // right line
        // first row
        ctx.beginPath();
        ctx.moveTo(each_width * i + width_crop + 2, 0);
        ctx.lineTo(each_width * i + width_crop + 2, height_crop + 2);
        ctx.stroke();
        // second row
        ctx.beginPath();
        ctx.moveTo(each_width * i + width_crop + 2, 1200);
        ctx.lineTo(each_width * i + width_crop + 2, 1200 - height_crop - 2);
        ctx.stroke();
    }
    // draw two horizontal line
    ctx.beginPath();
    ctx.moveTo(0, height_crop + 2);
    ctx.lineTo(1800, height_crop + 2);
    ctx.stroke()
    ctx.beginPath();
    ctx.moveTo(0, 1200 - height_crop - 2);
    ctx.lineTo(1800, 1200 - height_crop - 2);
    ctx.stroke();

    // ctx.setLineDash([6, 12]);
    // ctx.strokeStyle = "#EEE";
    // ctx.lineWidth = 6;
    // for (var i = -50; i < 100; i++) {
    //     ctx.beginPath();
    //     ctx.moveTo(i * 27.8, 1200 - height_crop - 6);
    //     ctx.lineTo(1200 - height_crop + i * 27.8, height_crop + 6);
    //     ctx.stroke();
    // }
    // };

    var logo = new Image();
    logo.setAttribute("crossOrigin", 'Anonymous');
    logo.onload = () => {
        if (btn_choose_mode != "usa") {
            ctx.drawImage(logo, 840, 550);
        }
        // let img replace canvas
        var saveHref = document.getElementById("save_href");
        var save_img = document.getElementById("save_img");
        var fileName = 'GoldenYears_' + getDateTime(new Date());
        
        var tempSrc = canvas.toDataURL("image/jpeg");
        saveHref.href = tempSrc;
        save_img.src = tempSrc;
        // console.log(save_img.src)
        // $("canvas").hide();

        let blobObj = dataURItoBlob(save_img.src);
        let blobUrl = URL.createObjectURL(blobObj);
        save_img.src = blobUrl;
        saveHref.href = blobUrl;

        $("#save_href").attr('download', fileName);
        $("#save_href").after(`<p>（點擊圖片即可下載）</p>`);
        $("#save_href").after(`<p>手機若無法下載時請嘗試改用Chrome瀏覽器開啟</p>`);
    }
}


function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}


// Convert base64 to blob ( for android mobile image download )
function dataURItoBlob(dataURI) {
    // console.log(dataURI);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var byteString = atob(dataURI.split(',')[1]);
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var intArray = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([intArray], {type: mimeString});
}
function downloadFile(fileName, base64) {
    // console.log(base64)
    var blob = dataURItoBlob(base64);
    //支持IE11
    console.log("ASD")
    window.navigator.msSaveBlob(blob, fileName);
}
function reload() {
    var image = document.querySelector('#image');
    var data = document.querySelector('#data');
    var button = document.getElementById('button');
    // var reset = document.getElementById('reset');
    // var rotate = document.getElementById('rotate');
    // var rotate_label = document.getElementById('rotate_label');
    // var big = document.getElementById('big');
    // var small = document.getElementById('small');
    // var result = document.getElementById('result');
    // var rotate_bar = document.getElementById("rotate_bar");
    var zoom_bar = document.getElementById("zoom_bar");
    var maxCroppedWidth = $(".cropper-container").eq(0).css("width");
    var maxCroppedHeight = $(".cropper-container").eq(0).css("height");
    var zv=0;
    var cropper = new Cropper(image, {
        aspectRatio: mode[btn_choose_mode].width / mode[btn_choose_mode].height,
        viewMode: 1,
        dragMode: 'move',
        autoCropArea: 1,
        zoomOnTouch: false,
        cropBoxMovable: false,
        restore: false,
        modal: false,
        background: false,
        zoomOnWheel: false,

        // cropBoxMovable: false,
        cropBoxResizable: false,
        ready: function(e){
            if(btn_choose_mode == "inch2_head")
                add_line();
            $(".cropper-drag-box").css("pointer-events", "none");
            // console.log(e);
        }
    });
    button.onclick = function () {
        crop.innerHTML = '';
        crop.appendChild(cropper.getCroppedCanvas());
        canvas_draw();
        $(".container").show();
        $(".step2").hide();
        $(".cropper-container").remove();
        
        // $("#crop_div").remove();
        // $("#button").remove();
        // $("#yc").append("<button onclick='download_android();'>（點擊圖片即可下載）</button>");
    };
    // reset.onclick = function() {
    //     cropper.reset();
    //     rotate_bar.value = 0;
    //     zoom_bar.value = 0;
    // }
    // rotate_bar.oninput = function(){
    //     cropper.rotateTo(this.value);
    //     rotate_label.innerText = `旋轉(${this.value}°)`;
    // }
    zoom_bar.oninput = function(){
        while(zv!=this.value){
            if(zv < this.value){
                zv += 1;
                cropper.zoom(0.01);
            }
            else{
                zv -= 1;
                cropper.zoom(-0.01);
            }
        }
    }
    // rotate.onclick = function () {
    //     cropper.rotate(90);
    // }
    // big.onclick = function(){
    //     cropper.zoom(0.05);
        
    // }
    // small.onclick = function(){
    //     cropper.zoom(-0.05);
    // }
};

function download_android(base64){
    window.location.href = 'data:application/octet-stream;base64,' + base64;
}
function readFile(input) {
    if (input.files && input.files[0]) {
        file = input.files[0];
    } else {
        return;
    }
    if (file.type.indexOf("image") == 0) {
        var reader = new FileReader();
        reader.onload = function (e) {
            if (e.total > 30000000) {
                alert("錯誤：檔案太大！");
            }
            else {
                $(`.yt-row-container`).remove();
                image.src = e.target.result;
                reload();
                window.scrollTo(0, 0);
                
            }
        };
        reader.readAsDataURL(file);
    }
    else {
        alert("上傳的不是圖檔！");
    }
}

$("#upload_img").on("change", function () {
    readFile(this);
    $(".step2").css("display", "block");
    $("#image").css("display", "block");
});

