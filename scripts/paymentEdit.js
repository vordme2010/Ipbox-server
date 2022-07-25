document.querySelector(".ETH-input").addEventListener("input", ev => {
    const output = document.querySelector(".ETH-to-USD")
    const outputConvert = document.querySelector(".USD-convert")
    const val = ev.target.value;
    const priceUSD = val * 1613.24
    const feeUSD = priceUSD / 100 * 5
    output.textContent = (`(~$${priceUSD})`)
    outputConvert.textContent = (`To pay: ($${feeUSD.toFixed(3)})`)
})
document.querySelector(".btn-success").addEventListener("click", ev=> {
    $(".icon-denied").addClass("hidden")
    $(".icon-approved").removeClass("hidden")
})