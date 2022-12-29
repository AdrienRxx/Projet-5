
const searchurl = document.location.search
console.log(searchurl)
const searchparam = new URLSearchParams(searchurl)
const id = searchparam.get("id")
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
    alert("vous avez clické");
  });


  // ON ECOUTE LA color 
  const chosecolor = document.querySelector("#colors");

  chosecolor.addEventListener("input", (ec) => {
    let colorProduit;
    colorProduit = ec.target.value;
    articleClient.color = colorProduit;
    console.log(colorProduit);

  });
  const chosequantity = document.querySelector('input[id="quantity"]');
  let quantityProduct;
  // On écoute ce qu'il se passe dans input[name="itemQuantity"]
  chosequantity.addEventListener("input", (eq) => {
    // on récupère la valeur de la cible de l'évenement dans color
    quantityProduct = eq.target.value;
    // on ajoute la quantity à l'objet panierClient
    articleClient.quantity = quantityProduct;
    console.log(quantityProduct);
  });
  // On créer une variable choix produit qui récupère les informations du bouton "addtocart" 
  let choseproduct = document.querySelector("#addToCart");
  // On écoute ce que l'on retourne au bouton
  choseproduct.addEventListener("click", () => {
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
      addToBasket();
      //avec une alerte le clic effectué 
      console.log("clic effectué");
      //on revient à la page accueil
      location.href = "./index.html"
    }
  })
}

infoArticle()

// fontcion ajout au panier 
function addToBasket() {
  //variabla stored items créaction dans le local storage de "appAdrien1103Kanaps"
  let storedItems = localStorage.getItem("appAdrien1103Kanaps")
  //si stored items est vide alors on stored item est égal dans un tableau à articledclient
  if (!storedItems) {
    storedItems = [articleClient]
  } else {
    //sinon on extrait ce qu'il y avait déjà dans le local storage donc un tableau 
    storedItems = JSON.parse(storedItems)
    // on une constante index qui est égale à stored items (renvoie l'indice du premier élément du tableau qui satisfait une condition donnée par une fonction.)
    const index = storedItems.findIndex(function (storedItem) {
      //on retourne alors storeditem.color qui est égale à articleclient.color, donc storeditem.id est égale à articleclient._id
      return storedItem.color === articleClient.color && storedItem._id === articleClient._id
    })
    //si un élément dans la panier existe déjà avec les critéres de l'élement qu'on veut ajouter (color ,id )
    if (index > -1) {
      storedItems[index] = articleClient
    } else {
      //sinon storeditems ajoute les articles
      storedItems.push(articleClient)
    }
  }
  //grace à setItem, on lui ajoute le nom du storage et on converti la valeur en json , permet de les ajouter à l'emplacement de stockage, sinon elle met à jour la valeur si la clé existe déjà.
  localStorage.setItem("appAdrien1103Kanaps", JSON.stringify(storedItems))
}