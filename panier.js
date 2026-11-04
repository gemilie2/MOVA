
// PANIER MOVA

const cartContainer = document.getElementById("cart-items");
const subtotalElement = document.getElementById("subtotal");
const totalElement = document.getElementById("total");
const emptyMessage = document.getElementById("empty-cart");

let cart = JSON.parse(localStorage.getItem("movaCart")) || [];

function saveCart() {
    localStorage.setItem("movaCart", JSON.stringify(cart));
}

function displayCart() {
    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        if (emptyMessage) emptyMessage.style.display = "block";
        updateTotals();
        return;
    }

    if (emptyMessage) emptyMessage.style.display = "none";

    cart.forEach((product, index) => {
        const item = document.createElement("div");
        item.classList.add("cart-item");

        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <div class="cart-item-info">
                <h3>${product.name}</h3>
                <p>${Number(product.price).toFixed(2)} €</p>

                <div class="quantity-controls">
                    <button class="minus">−</button>
                    <span>${product.quantity}</span>
                    <button class="plus">+</button>
                </div>
            </div>

            <div class="cart-item-price">
                <strong>${(product.price * product.quantity).toFixed(2)} €</strong>
                <button class="remove">Supprimer</button>
            </div>
        `;

        item.querySelector(".minus").addEventListener("click", () => {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }

            saveCart();
            displayCart();
        });

        item.querySelector(".plus").addEventListener("click", () => {
            cart[index].quantity++;
            saveCart();
            displayCart();
        });

        item.querySelector(".remove").addEventListener("click", () => {
            cart.splice(index, 1);
            saveCart();
            displayCart();
        });

        cartContainer.appendChild(item);
    });

    updateTotals();
}

function updateTotals() {
    const subtotal = cart.reduce((sum, product) => {
        return sum + product.price * product.quantity;
    }, 0);

    if (subtotalElement) {
        subtotalElement.textContent = subtotal.toFixed(2) + " €";
    }

    // Livraison gratuite à partir de 50 €
    const shipping = subtotal === 0 || subtotal >= 50 ? 0 : 4.90;
    const total = subtotal + shipping;

    if (totalElement) {
        totalElement.textContent = total.toFixed(2) + " €";
    }

    const shippingElement = document.getElementById("shipping");
    if (shippingElement) {
        shippingElement.textContent =
            shipping === 0 ? "Gratuite" : shipping.toFixed(2) + " €";
    }
}

// Bouton pour passer à la commande
const checkoutButton = document.getElementById("checkout-button");

if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Ton panier est vide !");
            return;
        }

        window.location.href = "commande.html";
    });
}

displayCart();
