
// COMMANDE MOVA

let cart = JSON.parse(localStorage.getItem("movaCart")) || [];

const summaryContainer = document.getElementById("order-items");
const subtotalElement = document.getElementById("order-subtotal");
const shippingElement = document.getElementById("order-shipping");
const totalElement = document.getElementById("order-total");
const shippingSelect = document.getElementById("shipping-method");
const orderForm = document.getElementById("order-form");

// Afficher le récapitulatif

function displayOrder() {
    if (cart.length === 0) {
        window.location.href = "panier.html";
        return;
    }

    if (!summaryContainer) return;

    summaryContainer.innerHTML = "";

    cart.forEach(product => {
        const item = document.createElement("div");
        item.classList.add("order-item");

        const price = Number(product.price) * Number(product.quantity);

        item.innerHTML = `
            <span>${product.name} × ${product.quantity}</span>
            <strong>${price.toFixed(2)} €</strong>
        `;

        summaryContainer.appendChild(item);
    });

    updateOrderTotal();
}


// Calculer les montants
function updateOrderTotal() {
const subtotal = cart.reduce((sum, product) => {
    return sum + Number(product.price) * Number(product.quantity);
}, 0);

    // Livraison standard : 4,90 €
    // Gratuite à partir de 50 € d'achat
    const shippingPrice = subtotal >= 50 ? 0 : 4.90;

    const total = subtotal + shippingPrice;

    if (subtotalElement) {
        subtotalElement.textContent = subtotal.toFixed(2) + " €";
    }

    if (shippingElement) {
        shippingElement.textContent =
            shippingPrice === 0
                ? "Gratuite"
                : shippingPrice.toFixed(2) + " €";
    }

    if (totalElement) {
        totalElement.textContent = total.toFixed(2) + " €";
    }
}
// Mettre à jour le prix si le mode de livraison change

// Valider le formulaire
if (orderForm) {
    orderForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (cart.length === 0) {
            alert("Ton panier est vide !");
            window.location.href = "panier.html";
            return;
        }

        if (!orderForm.checkValidity()) {
            orderForm.reportValidity();
            return;
        }

        alert("Commande fictive validée ! Merci d'avoir choisi MOVA.");

        // Vider le panier
        localStorage.removeItem("movaCart");

        // Retour à l'accueil
        window.location.href = "accueil.html";
    });
}

displayOrder();
