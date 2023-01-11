import { addToBasket } from "./cartManager.js"
const searchUrl = document.location.search
console.log(searchUrl)
const searchParam = new URLSearchParams(searchUrl)
const id = searchParam.get("id")
console.log(id)
// récupere l'id du produit sélectionné sur la page précedente via l'url
function idRecuperation() {
  fetch("http://localhost:3000/api/products/" + id)
    .then(function (response) {
      return response.json()
    })
    .then(function (kanap) {
      const imgItem = document.querySelector(".item__img")
      const img = document.createElement("img")
      img.src = kanap.imageUrl
      img.alt = kanap.altTxt
      imgItem.appendChild(img)
      const titleItem = document.querySelector("#title")
      titleItem.innerText = kanap.name
      const priceItem = document.querySelector("#price")
      priceItem.innerText = kanap.price
      const descriptionItem = document.querySelector("#description")
      descriptionItem.innerText = kanap.description
      const selectColor = document.querySelector("#colors")
      for (let i = 0; i < kanap.colors.length; i++) {
        const option = document.createElement("option")
        option.value = kanap.colors[i]
        option.innerText = kanap.colors[i]
        selectColor.appendChild(option)
      }
    })
}
const articleClient = {}
idRecuperation()
// ON créer l'objet articleClient
function infoArticle() {
  articleClient._id = id

  // ON ECOUTE LA color
  document.querySelector("#colors").addEventListener("input", (ec) => {
    articleClient.color = ec.target.value
    console.log(articleClient.color)
  })

  // On écoute ce qu'il se passe dans input[name="itemQuantity"]
  document
    .querySelector('input[id="quantity"]')
    .addEventListener("input", (eq) => {
      // on récupère la valeur de la cible de l'évenement dans quantity
      articleClient.quantity = +eq.target.value
      console.log(articleClient.quantity)
    })

  // On créer une variable choix produit qui récupère les informations du bouton "addtocart"
  // On clique sur le bouton (conditions )
  document.querySelector("#addToCart").addEventListener("click", () => {
    if (
      !articleClient.quantity ||
      articleClient.quantity < 1 ||
      articleClient.quantity > 100
    )
      return alert("Veuillez renseigner une quantité valide entre 1 et 100")
    if (!articleClient.color)
      return alert("Veuillez renseigner une couleur valide")
    //sinon on ajoute dans la panier
    addToBasket(articleClient)
    //avec une alerte le clic effectué
    console.log("clic effectué")
    //on revient à la page accueil
    location.href = "./index.html"
  })
}

infoArticle()