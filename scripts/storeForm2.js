let storeDataForm2 = "test"
class StoreDataForm2 {
    constructor(uploadFilePreview, nftName, nftDesc, sshHash, nftImage) {
        this.uploadFilePreview = uploadFilePreview
        this.nftName = nftName
        this.nftDesc = nftDesc
        this.sshHash = sshHash
        this.nftImage = nftImage
    }
}
class StoreForm2 {
    constructor() {
        this.uploadFilePreview = document.querySelector(".uploadFilePreview")
        this.nftName = document.querySelector(".main__IPINFO-NFT-input-name")
        this.nftDesc = document.querySelector(".main__IPINFO-NFT-textarea")
        this.sshHash = document.querySelector(".main__IPINFO-NFT-input-ssh")
        this.nftImage = document.querySelector(".file-upload-img")
        this.img = document.querySelector(".profile-pic")
        this.avatarIco = document.querySelector(".avatar-wrapper-ico")
        this.form2event(document.querySelector(".form2-btn")) 
        this.form2event(document.querySelector(".main__nav-item-type")) 
        this.form2event(document.querySelector(".main__nav-item-verify")) 
        this.form2event(document.querySelector(".main__nav-item-submit")) 
        this.setForm2()
    }
    setForm2() {
        this.checkInput(this.uploadFilePreview, "uploadFilePreview")
        this.fillInput(this.nftName, "nftName")
        this.fillTextArea(this.nftDesc, "nftDesc")
        this.fillInput(this.sshHash, "sshHash")
        this.fillImgInput(this.img, "nftImage")
    }
    form2event(eventItem) {
        let readerResult 
        eventItem.addEventListener("click", ev=> {
            this.createItem("uploadFilePreview", this.uploadFilePreview.classList.contains("checked"))
            this.createItem("nftName", this.nftName.value)
            this.createItem("nftDesc", this.nftDesc.value)
            this.createItem("sshHash", this.sshHash.value)
            storeDataForm2 = new StoreDataForm2(
                this.uploadFilePreview.classList.contains("checked"), 
                this.nftName.value, 
                this.nftDesc.value, 
                this.sshHash.value, 
            )
            console.log(storeDataForm2)
            alert("add")
            const reader = new FileReader()
            reader.readAsDataURL(this.nftImage.files[0])
            reader.addEventListener("load", ()=> {
                readerResult = reader.result
                this.createItem("nftImage", reader.result)
            })
  

            // console.log(storeDataForm2)
        })
    }
    createItem(itemName, value) {
        localStorage.setItem(itemName, value); 
    } 
    checkInput(elem, elemName) {
        if(this.getValue(elemName) == "true") {
            elem.click()
        }
    }
    fillInput(elem, elemName) {
        if(this.getValue(elemName).length != 0) {
            elem.value = this.getValue(elemName)
        }
    }
    fillTextArea(elem, elemName) {
        if(this.getValue(elemName).length != 0) {
            elem.textContent = this.getValue(elemName)
        }
    }
    fillImgInput(elem, elemName) {
        if(this.getValue(elemName) != null) {
            elem.setAttribute("src", this.getValue(elemName))
            this.avatarIco.classList.add("hidden")
            elem.classList.remove("hidden")
            elem.classList.add("file--active")
        }
    }
     // Creates a item named 'nameOfItem' and stores a value of 'value'
    
    getValue(itemName) {
        return localStorage.getItem(itemName);  
    } // Gets the value of 'nameOfItem' and returns it
}
const storeForm2 = new StoreForm2()