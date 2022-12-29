function confirmationJS() {
    document.getElementById("orderId").innerText = (new URLSearchParams(document.location.search)).get("orderId")
}
confirmationJS()