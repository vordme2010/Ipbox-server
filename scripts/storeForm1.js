class StoreForm1 {
    constructor() {
        this.form1event() 
    }
    form1event() {
        document.querySelector(".form2-btn").addEventListener("click", ev=> {
            const uploadFilePreview = document.querySelector(".uploadFilePreview")
            alert(uploadFilePreview.checked)
            // this.createItem()
        })
    }
    createItem(itemName, value) {
        localStorage.setItem(itemName, value); 
    } 
     // Creates a item named 'nameOfItem' and stores a value of 'value'
    
    getValue() {
        return localStorage.getItem('nameOfItem');  
    } // Gets the value of 'nameOfItem' and returns it
}
const storeForm1 = new StoreForm1()