let storeDataForm
class StoreDataForm {
    constructor(uploadFilePreview, nftName, nftDesc, sshHash, nftImage, ethPrice, usdConvert) {
        this.uploadFilePreview = uploadFilePreview
        this.nftName = nftName
        this.nftDesc = nftDesc
        this.sshHash = sshHash
        this.nftImage = nftImage
        this.ethPrice = ethPrice
        this.usdConvert = usdConvert
    }
}
class StoreForm {
    constructor() {
        this.determineForm()
    }
    determineForm() {
        const wrapper = document.querySelector(".wrapper")
        if(wrapper.classList.contains("wrapper-form2")) {
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
        else if (wrapper.classList.contains("wrapper-form4")) {
            this.form4event(document.querySelector(".form4-btn")) 
            this.form4event(document.querySelector(".main__nav-item-type")) 
            this.form4event(document.querySelector(".main__nav-item-settings")) 
            this.form4event(document.querySelector(".main__nav-item-verify")) 
            this.setForm4()
        }
    }
    setForm4() {
        const ethPrice = document.querySelector(".ETH-input")
        const usdConvert = document.querySelector(".USD-convert")
        const ethToUsd = document.querySelector(".ETH-to-USD")
        this.fillInput(ethPrice, "ethPrice")
        this.insertTextUsd(usdConvert, "usdConvert")
        this.insertTextEth(ethToUsd, "ethToUsd")
    }
    form4event(eventItem) {
        eventItem.addEventListener("click", ev=> {
            const ethPrice = document.querySelector(".ETH-input")
            const usdConvert = document.querySelector(".USD-convert")
            const ethToUsd = document.querySelector(".ETH-to-USD")
            const usdVal = usdConvert.textContent.slice(10, usdConvert.textContent.length - 1)
            const ethToUsdConvert = ethToUsd.textContent.slice(3, ethToUsd.textContent.length - 1)
            this.createItem("ethPrice", ethPrice.value)
            this.createItem("usdConvert", usdVal)
            this.createItem("ethToUsd", ethToUsdConvert)
            storeDataForm = new StoreDataForm(
                this.getValue("uploadFilePreview"),
                this.getValue("nftName"),
                this.getValue("nftDesc"),
                this.getValue("sshHash"),
                this.getValue("nftImage"),
                this.getValue("ethPrice"),
                this.getValue("usdConvert"),
            )
        })
    }
    setForm2() {
        this.checkInput(this.uploadFilePreview, "uploadFilePreview")
        this.fillInput(this.nftName, "nftName")
        this.fillTextArea(this.nftDesc, "nftDesc")
        this.fillInput(this.sshHash, "sshHash")
        this.fillImgInput(this.img, "nftImage")
    }
    form2event(eventItem) {
        eventItem.addEventListener("click", ev=> {
            this.createItem("uploadFilePreview", this.uploadFilePreview.classList.contains("checked"))
            this.createItem("nftName", this.nftName.value)
            this.createItem("nftDesc", this.nftDesc.value)
            this.createItem("sshHash", this.sshHash.value)
            const reader = new FileReader()
            reader.readAsDataURL(this.nftImage.files[0])
            reader.addEventListener("load", ()=> {
                this.createItem("nftImage", reader.result)
            })
        })
    }
    createItem(itemName, value) {
        sessionStorage.setItem(itemName, value); 
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
    insertTextEth(elem, elemName) {
        if(this.getValue(elemName) != "0") {
            elem.textContent = (`To pay: (~$${this.getValue(elemName)})`)
        }
    }
    insertTextUsd(elem, elemName) {
        if(this.getValue(elemName) != "0") {
            elem.textContent = (`To pay: ($${this.getValue(elemName)})`)
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
    getValue(itemName) {
        return sessionStorage.getItem(itemName);  
    } 
}
const storeForm = new StoreForm()
document.querySelector(".form4-btn").addEventListener("click", ()=> {
    console.log(storeDataForm)
})