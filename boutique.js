
/* PRODUITS DE DÉMONSTRATION */

const products = [
    {
        id: "tapis-yoga",
        name: "Tapis de yoga",
        category: "yoga",
        price: 29.90,
        image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=800&q=85"
    },
    {
        id: "halteres",
        name: "Haltères de fitness",
        category: "fitness",
        price: 24.90,
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=85"
    },
    {
        id: "gourde",
        name: "Gourde sportive",
        category: "accessoires",
        price: 19.90,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=85"
    },
    {
        id: "sac-sport",
        name: "Sac de sport",
        category: "accessoires",
        price: 34.90,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85"
    },
    {
        id: "running",
        name: "Accessoire running",
        category: "running",
        price: 22.90,
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=85"
    },
    {
        id: "bande-elastique",
        name: "Bande élastique",
        category: "fitness",
        price: 14.90,
        image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=85"
    }
];

const grid = document.getElementById("product-grid");
const filters = document.querySelectorAll(".filter");
const sortSelect = document.getElementById("sort-products");
const noProducts = document.getElementById("no-products");

let currentCategory = "all";


/* AFFICHER LES PRODUITS */

function displayProducts() {

    let displayedProducts = [...products];

    if (currentCategory !== "all") {
        displayedProducts = displayedProducts.filter(
            product => product.category === currentCategory
        );
    }

    if (sortSelect.value === "price-asc") {
        displayedProducts.sort((a, b) => a.price - b.price);
    }

    if (sortSelect.value === "price-desc") {
        displayedProducts.sort((a, b) => b.price - a.price);
    }

    grid.innerHTML = "";

    noProducts.hidden = displayedProducts.length !== 0;

    displayedProducts.forEach(product => {

        const card = document.createElement("a");

        card.className = "product-card";
        card.href = `produit.html?id=${product.id}`;

        card.innerHTML = `
            <img class="product-image"
                 src="${product.image}"
                 alt="${product.name}">

            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3>${product.name}</h3>
                <p class="product-price">${product.price.toFixed(2)} €</p>
            </div>
        `;

        grid.appendChild(card);

    });

}


/* FILTRES */

filters.forEach(button => {

    button.addEventListener("click", () => {

        filters.forEach(filter => filter.classList.remove("active"));

        button.classList.add("active");

        currentCategory = button.dataset.category;

        displayProducts();

    });

});


/* TRI */

sortSelect.addEventListener("change", displayProducts);


/* CATÉGORIE TRANSMISE PAR L'ACCUEIL */

const params = new URLSearchParams(window.location.search);
const requestedCategory = params.get("categorie");

if (requestedCategory) {

    const matchingFilter = document.querySelector(
        `.filter[data-category="${requestedCategory}"]`
    );

    if (matchingFilter) {
        matchingFilter.click();
    }

}


/* COMPTEUR DU PANIER */

function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("movaCart")) || [];

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.getElementById("cart-count").textContent = count;

}

displayProducts();
updateCartCount();
