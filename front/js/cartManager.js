/** Récupere le panier par le localstorage ou défini un panier vide */
export function getCart() {
    return JSON.parse(localStorage.getItem("appAdrien1103Kanaps")) || []
}

/** On sauvegarde le panier dans le localstorage */
export function saveCart(items) {
    localStorage.setItem("appAdrien1103Kanaps", JSON.stringify(items))
}
/** fonction ajout au panier */
export function addToBasket(article) {
    const items = getCart()
    //on recherche l'item dans le panier en comparant sa couleur et son id 
    const item = items.find((occurence) => occurence.color === article.color && occurence._id === article._id)
    //si l'item existe alors on augmente sa quantité 
    if (item) item.quantity += article.quantity
    //sinon on ajoute l'item au panier 
    else items.push(article)
    saveCart(items)
}
export function deleteFromCart(article) {
    let items = getCart()
    items = items.filter((occurence) => occurence.color !== article.color || occurence._id !== article._id)
    saveCart(items)
}

export function changeQuantityInCart(article) {
    const items = getCart()
    //on recherche l'item dans le panier en comparant sa couleur et son id 
    const item = items.find((occurence) => occurence.color === article.color && occurence._id === article._id)
    //si l'item existe alors on défini sa quantité 
    if (item) item.quantity = article.quantity
    //sinon on ajoute l'item au panier 
    saveCart(items)
}

export function clearCart() {
    localStorage.removeItem("appAdrien1103Kanaps")

}