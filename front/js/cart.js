//on créer une variable basket, qui sera dans le localStorage qui aura pour nom "appAdrien1103Kanaps"
let basket = localStorage.getItem("appAdrien1103Kanaps")
//on créer une variable basketwithinfo qui est un tableau qui affichera le panier 
let basketWithInfo = []
//si basket renvoi rien alors une alert apparait "votre panier est vide "
const totalQuantity = document.getElementById('totalQuantity')
const totalPrice = document.getElementById('totalPrice')
if (!basket) {
  alert("votre panier est vide ")
} else {
  //sinon on analyse basket     
  basket = JSON.parse(basket)
  //on créer une variable promises qui sera un tableau 
  const promises = []
  for (let i = 0; i < basket.length; i++) {
    promises.push(new Promise((resolve) => {
      fetch("http://localhost:3000/api/products/" + basket[i]._id)
        .then(function (response) {
          return response.json();
        })
        .then(function (kanap) {
          resolve({ ...kanap, quantity: basket[i].quantity, color: basket[i].color })


        })
    }))
  }
  Promise.all(promises).then((results) => {
    basketWithInfo = results
    console.log(results);
    const cartItems = document.querySelector('#cart__items')
    let totalP = 0
    let totalQ = 0
    for (const product of results) {
      const quantity = parseInt(product.quantity)
      const price = Number(product.price)
      totalQ += quantity
      totalP += (quantity * price)
      const article = document.createElement('article')
      article.className = 'cart__item'
      article.dataset.id = product._id
      article.dataset.color = product.color
      cartItems.appendChild(article)

      const div = document.createElement('div')
      div.className = 'cart__item__img'
      article.appendChild(div)
      const img = document.createElement('img')
      img.src = product.imageUrl
      img.alt = product.altTxt
      div.appendChild(img)

      const div1 = document.createElement('div')
      div1.className = 'cart__item__content'
      article.appendChild(div1)

      const div2 = document.createElement('div')
      div2.className = 'cart__item__content__description'
      div1.appendChild(div2)

      const nameProduct = document.createElement('h2')
      nameProduct.innerText = product.name
      div2.appendChild(nameProduct)


      const colorProduct = document.createElement('p')
      colorProduct.innerText = 'Couleur: ' + product.color
      div2.appendChild(colorProduct)

      const priceProduct = document.createElement('p')
      priceProduct.innerText = product.price
      div2.appendChild(priceProduct)

      const div3 = document.createElement('div')
      div3.className = 'cart__item__content__settings'
      div1.appendChild(div3)

      const div4 = document.createElement('div')
      div4.className = 'cart__item__content__settings__quantity'
      div3.appendChild(div4)

      const settingsQuantity = document.createElement('p')
      settingsQuantity.innerText = product.quantity
      div4.appendChild(settingsQuantity)

      const inputSettingsQuantity = document.createElement('input')
      inputSettingsQuantity.className = 'itemQuantity'
      inputSettingsQuantity.type = 'number'
      inputSettingsQuantity.name = 'itemQuantity'
      inputSettingsQuantity.value = product.quantity
      inputSettingsQuantity.min = 1
      inputSettingsQuantity.max = 100
      div4.appendChild(inputSettingsQuantity)
      let actualValue = inputSettingsQuantity.value
      inputSettingsQuantity.addEventListener("input", (e) => {
        const newValue = parseInt(e.target.value)
        if (!(newValue >= 1) || !(newValue <= 100)) {
          alert('est pas entre 1 et 100')
          e.target.value = actualValue
        } else {
          const deltaValue = newValue - actualValue
          totalQ += deltaValue
          totalP += deltaValue * product.price
          totalQuantity.innerText = totalQ
          totalPrice.innerText = totalP
          actualValue = e.target.value
          const index = basket.findIndex((item) => item._id == product._id && item.color == product.color)
          if (index == -1) {
            alert('une erreur est apparu')
            return;
          }
          basket[index].quantity = newValue
          basketWithInfo[index].quantity = newValue
          localStorage.setItem('appAdrien1103Kanaps', JSON.stringify(basket))
          settingsQuantity.innerText = newValue
        }
      })

      const div5 = document.createElement('div')
      div5.className = 'cart__item__content__settings__delete'
      div3.appendChild(div5)

      const contentSettingsDelete = document.createElement('p')
      contentSettingsDelete.className = 'deleteItem'
      contentSettingsDelete.innerText = 'Supprimer'
      contentSettingsDelete.addEventListener('click', (e) => {
        let index = results.indexOf(product);
        results.splice(index, 1);
        localStorage.setItem('appAdrien1103Kanaps', JSON.stringify(results));

        updateNumberArticles();

      });
      div5.appendChild(contentSettingsDelete)



    }
    totalPrice.innerText = totalP
    totalQuantity.innerText = totalQ



    /*<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
            <div class="cart__item__img">
              <img src="../images/product01.jpg" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>Nom du produit</h2>
                <p>Vert</p>
                <p>42,00 €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>*/

  })
}
function suppression() {
  // déclaration de variables
  const cartdelete = document.querySelectorAll(".cart__item .deleteItem");
  // pour chaque élément cartdelete
  cartdelete.forEach((cartdelete) => {
    // On écoute s'il y a un clic dans l'article concerné
    cartdelete.addEventListener("click", () => {
      // appel de la ressource du local storage
      let panier = JSON.parse(localStorage.getItem("panierStocké"));
      for (let d = 0, c = panier.length; d < c; d++)
        if (
          panier[d]._id === cartdelete.dataset.id &&
          panier[d].couleur === cartdelete.dataset.couleur
        ) {
          // déclaration de variable utile pour la suppression
          const num = [d];
          // création d'un tableau miroir, voir mutation
          let nouveauPanier = JSON.parse(localStorage.getItem("appAdrien1103Kanaps"));
          //suppression de 1 élément à l'indice num
          nouveauPanier.splice(num, 1);
          //affichage informatif
          if (nouveauPanier && nouveauPanier.length == 0) {
            // si il n'y a pas de panier on créait un H1 informatif et quantité appropriées
            document.querySelector("#totalQuantity").innerHTML = "0";
            document.querySelector("#totalPrice").innerHTML = "0";
            document.querySelector("h1").innerHTML =
              "Vous n'avez pas d'article dans votre panier";
          }
          // on renvoit le nouveau panier converti dans le local storage et on joue la fonction
          localStorage.panierStocké = JSON.stringify(nouveauPanier);
          totalProduit(); // logique mais pas obligatoire à cause du reload plus bas qui raffraichit l'affichage; serait necessaire avec suppression sans reload
          // on recharge la page qui s'affiche sans le produit grace au nouveau panier
          return location.reload();
        }
    });
  });
}