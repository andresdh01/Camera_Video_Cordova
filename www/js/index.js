
var app = {
   
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    
    receivedEvent: function(id) {
        document.getElementById("Tomar_foto").onclick=Tomar_foto;
        console.log('Received Event: ' + id);
        document.getElementById("videoCapture").addEventListener("click", videoCapture);
        console.log('Received Event: ' + id);
    }
};

function Tomar_foto(){
    navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 90,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        mediaType: Camera.MediaType.PICTURE,
        encodingType: Camera.EncodingType.JPEG,
        cameraDirection: Camera.Direction.FRONT,
        saveToPhotoAlbum: true
        }
    );

    function onSuccess(ruta_de_la_foto) {
        document.getElementById("fotos").innerHTML+=
        `
        <div class="foto">
            <img src="${ruta_de_la_foto}" controls>
            </img>
        </div>
    `
        
       // "<div class='foto'><img src='"+ruta_de_la_foto+"'></div>"
    }

    function onFail(message) {
        alert('fallo porque: ' + message);
    }



}

function videoCapture() {
    var options = {
       limit: 1,
       duration: 10,
       destinationType: Camera.DestinationType.FILE_URI,
    sourceType: Camera.PictureSourceType.CAMERA,
    };
    navigator.device.capture.captureVideo(onSuccess, onError, options);

  
    function onSuccess(mediaFiles){
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
           path = mediaFiles[i].fullPath;
           console.log(mediaFiles);
        }
        document.getElementById("videos").innerHTML+=

        `
            <div class="video-container">
                <video src="${path}"  class="video-item" controls />
            </div>
        `
        
    
    /*
    function onSuccess(mediaFiles) {
       var i, path, len;
       for (i = 0, len = mediaFiles.length; i < len; i += 1) {
          path = mediaFiles[i].fullPath;
          console.log(mediaFiles);
       }*/
    }
 
    function onError(error) {
       navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    }
 }

app.initialize();