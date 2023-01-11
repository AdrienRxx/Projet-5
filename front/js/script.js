function scriptJS() {
    fetch("http://localhost:3000/api/products")
        .then(function (response) {
            return response.json();
        })
        .then(function (kanaps) {
            const listItems = document.getElementById("items")
            for (let i = 0; i < kanaps.length; i++) {
                const kanap = kanaps[i]
                listItems.innerHTML += `<a href="./product.html?id=${kanap._id}">
            <article>
                <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
                <h3 class="productName">${kanap.name}</h3>
                <p class="productDescription">${kanap.description}</p>
            </article>
            </a>`
            }
            console.log(kanaps);
        })
}
scriptJS()
