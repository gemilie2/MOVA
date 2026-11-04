
/* PRODUITS DE DÉMONSTRATION
   Les informations doivent correspondre
   aux produits de boutique.js.
*/

const products = [
    {
        id: "tapis-yoga",
        name: "Tapis de yoga",
        category: "Yoga & Pilates",
        price: 29.90,
        description: "Un tapis pensé pour accompagner tes séances de yoga, de Pilates et tes moments de détente.",
        image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: "halteres",
        name: "Haltères de fitness",
        category: "Fitness",
        price: 24.90,
        description: "Un accessoire pratique pour compléter tes séances de renforcement musculaire.",
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: "gourde",
        name: "Gourde sportive",
        category: "Accessoires",
        price: 19.90,
        description: "Une gourde à emporter partout pour accompagner tes activités sportives.",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: "sac-sport",
        name: "Sac de sport",
        category: "Accessoires",
        price: 34.90,
        description: "Un sac pratique pour transporter tes affaires pendant tes déplacements et tes entraînements.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: "running",
        name: "Accessoire running",
        category: "Running",
        price: 22.90,
        description: "Un accessoire à découvrir pour compléter ton équipement de running.",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: "bande-elastique",
        name: "Bande élastique",
        category: "Fitness",
        price: 14.90,
        description: "Un accessoire compact pour varier tes exercices de renforcement musculaire.",
        image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=1000&q=85"
    }
];


/* RÉCUPÉRER LE PRODUIT CHOISI */

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const product = products.find(item => item.id === productId);


/* AFFICHER LE PRODUIT */

if (product) {

    document.title = product.name + " | MOVA";

    document.getElementById("product-name").textContent = product.name;

    document.getElementById("product-category").textContent = product.category;

    document.getElementById("product-price").textContent =
        product.price.toFixed(2) + " €";

    document.getElementById("product-description").textContent =
        product.description;

    document.getElementById("main-image").src = product.image;

    document.getElementById("main-image").alt = product.name;

    document.getElementById("breadcrumb-product").textContent =
        product.name;

} else {

    document.getElementById("product-name").textContent =
        "Produit introuvable";

    document.getElementById("product-description").textContent =
        "Ce produit n'existe pas ou n'est plus disponible.";

    document.getElementById("add-to-cart").disabled = true;

}


/* GESTION DE LA QUANTITÉ */

const quantityInput = document.getElementById("quantity");

document.getElementById("minus").addEventListener("click", () => {

    let quantity = Number(quantityInput.value);

    if (quantity > 1) {
        quantityInput.value = quantity - 1;
    }

});

document.getElementById("plus").addEventListener("click", () => {

    let quantity = Number(quantityInput.value);

    if (quantity < 10) {
        quantityInput.value = quantity + 1;
    }

});

quantityInput.addEventListener("change", () => {

    let quantity = Number(quantityInput.value);

    if (!Number.isFinite(quantity)) quantity = 1;

    quantityInput.value = Math.min(10, Math.max(1, Math.floor(quantity)));

});


/* AJOUTER AU PANIER */

document.getElementById("add-to-cart").addEventListener("click", () => {

    if (!product) return;

    const quantity = Number(quantityInput.value);

    let cart = JSON.parse(localStorage.getItem("movaCart")) || [];

    const existingProduct = cart.find(
        item => item.id === product.id
    );

    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });

    }

    localStorage.setItem("movaCart", JSON.stringify(cart));

    document.getElementById("cart-message").textContent =
        "Produit ajouté au panier !";

    updateCartCount();

});


/* COMPTEUR DU PANIER */

function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("movaCart")) || [];

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.getElementById("cart-count").textContent = count;

}

updateCartCount();
