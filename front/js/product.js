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
      return response.json();
    })
    .then(function (kanap) {
      const imgItem = document.querySelector(".item__img")
      // imgItem.innerHTML = `<img src="${kanap.imageUrl}" alt="${kanap.altTxt}">` 
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
        const option = document.createElement('option')
        option.value = kanap.colors[i]
        option.innerText = kanap.colors[i]
        selectColor.appendChild(option)

      }
    })
}

const articleClient = {};
idRecuperation()
// ON créer l'objet articleClient 
function infoArticle() {


  articleClient._id = id;

  // On récupère le bouton et on lui ajoute un eventlistener "click" 
  document.getElementById("addToCart").addEventListener("click", function () {
    //alert("vous avez clické");
  });


  // ON ECOUTE LA color 
  const choseColor = document.querySelector("#colors");

  choseColor.addEventListener("input", (ec) => {
    let colorProduit;
    colorProduit = ec.target.value;
    articleClient.color = colorProduit;
    console.log(colorProduit);

  });
  const choseQuantity = document.querySelector('input[id="quantity"]');
  let quantityProduct;
  // On écoute ce qu'il se passe dans input[name="itemQuantity"]
  choseQuantity.addEventListener("input", (eq) => {
    // on récupère la valeur de la cible de l'évenement dans color
    quantityProduct = eq.target.value;
    // on ajoute la quantity à l'objet panierClient
    articleClient.quantity = quantityProduct;
    console.log(quantityProduct);
  });
  // On créer une variable choix produit qui récupère les informations du bouton "addtocart" 
  let choseProduct = document.querySelector("#addToCart");
  // On écoute ce que l'on retourne au bouton
  choseProduct.addEventListener("click", () => {
    if (
      //si l'article a une quantité inférieur à 1 e alors une alerte apparait (||veut dire renvoie vrai si et seulement si au moins un de ses opérandes est vrai. )
      articleClient.quantity < 1 ||
      //si l'article a une quantité supérieur à 100 alors une alerte apparait 
      articleClient.quantity > 100 ||
      //si l'article est pas défini alors une alerte apparait 
      articleClient.quantity === undefined ||
      //si le color est une chaine de caractère vide alors une alerte apparait 
      articleClient.color === "" ||
      //si la color est pas défini alors une alerte apparait 
      articleClient.color === undefined
    ) {
      alert("Pour valider le choix de cet article, veuillez renseigner une color, et/ou une quantity valide entre 1 et 100");
    } else {
      //sinon on ajoute dans la panier 
      addToBasket(articleClient);
      //avec une alerte le clic effectué 
      console.log("clic effectué");
      //on revient à la page accueil
      location.href = "./index.html"
    }
  })
}

infoArticle()


