class PdfToHex {
    constructor(hDcode) {
        this.uint8View;
        this.hDcode = hDcode
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
        console.log(hexText)
        const encoder = new TextEncoder()
        const view = encoder.encode(hexText)
        console.log(view)
        //NEEDLESS !!!
        document.frmConvert.ed_output.value = hexText;	
        //NEEDLESS !!!	  	
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
    openFile(event) {
        const input = event.target;
        this.readFileAsArray(input.files[0]);
    }
    drop_handler(event) {
        event.preventDefault();
        // If dropped items aren't files, reject them
        const dt = event.dataTransfer;
        if (dt.items) {
            // Use DataTransferItemList interface to access the file(s)
            for (let i = 0; i < dt.items.length; i++) {
                if (dt.items[i].kind == "file") {
                    const file = dt.items[i].getAsFile();
                    this.readFileAsArray(file);
                    break;
                }
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            for (let i = 0; i < dt.files.length; i++) {
                this.readFileAsArray(dt.files[i]);
                break;
            }
        }
    }
    dragover_handler(event) {
        // Prevent default select and drag behavior
        event.preventDefault();
    }
    dragend_handler(event) {
        // Remove all of the drag data
        const dt = event.dataTransfer;
        if (dt.items) {
            // Use DataTransferItemList interface to remove the drag data
            for (let i = 0; i < dt.items.length; i++) {
                dt.items.remove(i);
            }
        } else {
            // Use DataTransfer interface to remove the drag data
            event.dataTransfer.clearData();
        }
    }          
}

const pdfToText = new PdfToHex('0123456789ABCDEF')





	
    

    

        
                 