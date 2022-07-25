// var CryptoJS = require("crypto-js");
class PdfToHex {
    constructor(hDcode) {
        this.uint8View;
        this.hDcode = hDcode
        this.openFile()
        this.copyHEX()
    }
    dec2hex(charVal) {
        let hex = this.hDcode.substr(charVal & 15,1);
        while (charVal > 15) {
            charVal >>= 4;
            hex=this.hDcode.substr(charVal & 15,1) + hex;
        }
        return hex;
    }    
    convert() {	
        let hexText = "";
        let separator = "";		
        for (let i = 0; i < this.uint8View.length; i++) {
            const charVal = this.uint8View[i];
            hexText = hexText + separator + (charVal < 16 ? "0" : "") + this.dec2hex(charVal);
            if (i < this.uint8View.length - 1) {
                hexText += separator;
            } 
        }
        const sha256hash = sha256(hexText)
        document.getElementById("SSH-input").value = sha256hash;
    }  
    copyHEX() {
        document.getElementById("SSH-input").addEventListener("click", ev => {
            if(ev.target.value != 0) {
                const copyText = ev.target;
                navigator.clipboard.writeText(copyText.value);
                alert("Hash-Code copied.");
            }
        })
    }
    readFileAsArray(file) {
        const self = this;
        const reader = new FileReader();
        reader.onload = function() {
		  const arr = reader.result;
		  self.uint8View = new Uint8Array(arr);	  
          self.convert();          	  
        };
        reader.readAsArrayBuffer(file);    
    } 
    copyOutputToClipboard() {
        const target = document.frmConvert.ed_output; 
        const origSelectionStart = target.selectionStart;
        const origSelectionEnd = target.selectionEnd;
        // select the content
        const currentFocus = document.activeElement;
        target.focus();
        target.setSelectionRange(0, target.value.length);
        let succeed;
        try {
            succeed = document.execCommand("copy");
        } catch(e) {
            succeed = false;
        }
        // restore original focus
        if (currentFocus && typeof currentFocus.focus === "function") {
            currentFocus.focus();
        }
        // restore prior selection
        target.setSelectionRange(origSelectionStart, origSelectionEnd);                        
    }
    openFile() {
        const self = this
        $("#myPdf").change(function(event){
            const input = event.target;
            self.readFileAsArray(input.files[0]);
        });
    }      
}

const pdfToText = new PdfToHex('0123456789ABCDEF')





	
    

    

        
                 