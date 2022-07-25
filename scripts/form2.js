function checkInput(event) {
    event.target.classList.toggle("checked");
}
$(function() {
    $(window).on("scroll", function() {
        if($(window).scrollTop() > 0) {
            $(".header").addClass("header--active");
        } else {
            //remove the background property so it comes transparent again (defined in your css)
           $(".header").removeClass("header--active");
        }
    });
});
let fileName 
// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];
// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

$("#myPdf").change(function(){
    fileName = this.files[0].name;
});
$("#myPdf").on("change", function(e){
    $(".main__IPINFO-file-img").removeClass("hidden");
    $("#file-name-fake").addClass("hidden");
    $(".main__IPINFO-file-img-fake").addClass("hidden");
	var file = e.target.files[0]
	if(file.type == "application/pdf"){
		var fileReader = new FileReader();  
		fileReader.onload = function() {
			var pdfData = new Uint8Array(this.result);
			// Using DocumentInitParameters object to load binary data.
			var loadingTask = pdfjsLib.getDocument({data: pdfData});
			loadingTask.promise.then(function(pdf) {
              if(fileName.length >= 20) {
                $("#file-name").text(fileName.slice(0, 6) + "..." + fileName.slice(fileName.length - 6, fileName.length))
              }
              else {
                $("#file-name").text(fileName);
              }
			  // Fetch the first page
			  var pageNumber = 1;
			  pdf.getPage(pageNumber).then(function(page) {
				
                $(".main__IPINFO-file-img").addClass("file--active");
				let scale = 0.4;
                page.getViewport({scale: scale}).viewBox[2] = 850;
                page.getViewport({scale: scale}).viewBox[3] = 580;
                if(!$("#myPdf").hasClass("pdfID")) {
                    scale = 0.3;
                    page.getViewport({scale: scale}).viewBox[2] = 600;
                    page.getViewport({scale: scale}).viewBox[3] = 850;
                }
				var viewport = page.getViewport({scale: scale});
				// Prepare canvas using PDF page dimensions
				var canvas = $("#pdfViewer")[0];
				var context = canvas.getContext('2d');
				canvas.height = viewport.height;
				canvas.width = viewport.width;

				// Render PDF page into canvas context
				var renderContext = {
				  canvasContext: context,
				  viewport: viewport
				};
				var renderTask = page.render(renderContext);
				renderTask.promise.then(function () {
				});
			  });
			}, function (reason) {
			});
		};
		fileReader.readAsArrayBuffer(file);
	}
});



$(document).ready(function() {
	
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }
   
    $(".file-upload").on('change', function(){
        readURL(this);
        $(".avatar-wrapper-ico").addClass("hidden")
        $(".profile-pic").removeClass("hidden")
        $(".profile-pic").addClass("file--active")
    });
    $(".avatar-wrapper-ico").on('click', function(){
        $(".file-upload").click();
    });
    
    $(".upload-button").on('click', function() {
       $(".file-upload").click();
    });
});
document.getElementById('inputfile').addEventListener('change', function() {
              
            var fr=new FileReader();
            fr.onload=function(){
                document.getElementById('output').textContent=fr.result;
            }
              
            fr.readAsText(this.files[0]);
})
