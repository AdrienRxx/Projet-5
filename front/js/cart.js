import {
  changeQuantityInCart,
  clearCart,
  deleteFromCart,
  getCart,
} from "./cartManager.js";
//on créer une variable basket, qui sera dans le localStorage qui aura pour nom "appAdrien1103Kanaps"
let basket = getCart();
//si basket renvoi rien alors une alert apparait "votre panier est vide "
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
// Pour chaque article qui se trouve dans le panier, on va chercher les informations à partir de l'id.
const promises = basket.map((item) =>
  fetch(`http://localhost:3000/api/products/${item._id}`)
    .then((response) => response.json())
    .then((kanap) => ({ ...kanap, quantity: item.quantity, color: item.color }))
);
Promise.all(promises).then((results) => {
  const cartItems = document.querySelector("#cart__items");
  let totalP = 0;
  let totalQ = 0;
  for (const product of results) {
    const quantity = parseInt(product.quantity);
    const price = Number(product.price);
    totalQ += quantity;
    totalP += quantity * price;
    const article = document.createElement("article");
    article.className = "cart__item";
    article.dataset.id = product._id;
    article.dataset.color = product.color;
    cartItems.appendChild(article);
    const cartItemImg = document.createElement("div");
    cartItemImg.className = "cart__item__img";
    article.appendChild(cartItemImg);
    const img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    cartItemImg.appendChild(img);
    const cartItemContent = document.createElement("div");
    cartItemContent.className = "cart__item__content";
    article.appendChild(cartItemContent);
    const cartItemContentDescription = document.createElement("div");
    cartItemContentDescription.className = "cart__item__content__description";
    cartItemContent.appendChild(cartItemContentDescription);
    const nameProduct = document.createElement("h2");
    nameProduct.innerText = product.name;
    cartItemContentDescription.appendChild(nameProduct);
    const colorProduct = document.createElement("p");
    colorProduct.innerText = "Couleur: " + product.color;
    cartItemContentDescription.appendChild(colorProduct);
    const priceProduct = document.createElement("p");
    priceProduct.innerText = product.price;
    cartItemContentDescription.appendChild(priceProduct);
    const cartItemContentSettings = document.createElement("div");
    cartItemContentSettings.className = "cart__item__content__settings";
    cartItemContent.appendChild(cartItemContentSettings);
    const cartItemSettingsQuantity = document.createElement("div");
    cartItemSettingsQuantity.className =
      "cart__item__content__settings__quantity";
    cartItemContentSettings.appendChild(cartItemSettingsQuantity);
    const settingsQuantity = cartItemSettingsQuantity.appendChild(
      document.createElement("p")
    );
    settingsQuantity.innerText = "Qté : ";
    const inputSettingsQuantity = document.createElement("input");
    inputSettingsQuantity.className = "itemQuantity";
    inputSettingsQuantity.type = "number";
    inputSettingsQuantity.name = "itemQuantity";
    inputSettingsQuantity.value = product.quantity;
    inputSettingsQuantity.min = 1;
    inputSettingsQuantity.max = 100;
    cartItemSettingsQuantity.appendChild(inputSettingsQuantity);
    inputSettingsQuantity.addEventListener("change", (e) => {
      //valueAsNumber remplace le parseInt
      const newValue = +e.target.value;
      if (newValue < 1 || newValue > 100) {
        e.target.value = product.quantity;
        return alert("est pas entre 1 et 100");
      }
      const deltaValue = newValue - product.quantity;
      totalQ += deltaValue;
      totalP += deltaValue * product.price;
      totalQuantity.innerText = totalQ;
      totalPrice.innerText = totalP;
      product.quantity = +e.target.value;
      changeQuantityInCart(product);
    });
    //Possibilité de supprimer dans la page et d'actualiser le total
    const cartItemContentSettingsDelete = cartItemContentSettings.appendChild(
      document.createElement("div")
    );
    cartItemContentSettingsDelete.className =
      "cart__item__content__settings__delete";
    const contentSettingsDelete = document.createElement("p");
    contentSettingsDelete.className = "deleteItem";
    contentSettingsDelete.innerText = "Supprimer";
    contentSettingsDelete.addEventListener("click", (e) => {
      const deltaValue = -product.quantity;
      totalQ += deltaValue;
      totalP += deltaValue * product.price;
      totalQuantity.innerText = totalQ;
      totalPrice.innerText = totalP;
      deleteFromCart(product);
      article.remove();
    });
    cartItemContentSettingsDelete.appendChild(contentSettingsDelete);
  }
  totalPrice.innerText = totalP;
  totalQuantity.innerText = totalQ;
});
function pattern() {
  document.getElementById("firstName").pattern =
    "^[a-zA-Zàâéèëêïîôùüç -]{1,60}$";
  document.getElementById("lastName").pattern =
    "^[a-zA-Zàâéèëêïîôùüç -]{1,60}$";
  document.getElementById("address").pattern = "([0-9]*) ?([a-zA-Z,. ]*)";
  document.getElementById("city").pattern = "^[a-zA-Zàâéèëêïîôùüç -]{1,60}$";
}
pattern();
async function allInformations(e) {
  e.preventDefault();
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;
  const contact = { firstName, lastName, address, city, email };
  /*Créer un objet ou on va appeler le champ contact venant du formulaire 
  et les produits venant du localStorage ('appAdrien1103'),
   pour pouvoir l'envoyer à l'api */
  //utiliser le localStorage, essayer d'utiliser une méthode de Array//
  /** liste des produits
   * @type {Array}
   */
  let products = getCart().map((value) => value._id);
  if (!products.length) return;

  console.log(products);
  let formInfo = { contact, products };
  console.log(formInfo);
  let response = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(formInfo),
  });
  clearCart();
  /** liste des produits
   * @type {{contact:any,produit:any,orderId:string}}
   */
  const json = await response.json();
  document.location = `./confirmation.html?orderId=${json.orderId}`;
  console.log("retour de la requete", json);
}
document
  .getElementById("order")
  .form.addEventListener("submit", allInformations);
