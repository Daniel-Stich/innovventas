// ======================
// CARRITO SIMPLE
// ======================

let cart = [];

function addToCart(nombre, precio) {

    cart.push({
        nombre,
        precio
    });

    updateCartCounter();
    updateCartSidebar();

    showToast(`✅ ${nombre} agregado al carrito`);
}

function updateCartCounter() {

    document.getElementById("cart-count").textContent =
    cart.length;
}

function updateCartSidebar() {

    const cartItems =
    document.getElementById("cart-items");

    const cartTotal =
    document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        total += item.precio;

        cartItems.innerHTML += `
        <div class="cart-item">
            ${item.nombre}
            - S/ ${item.precio}
        </div>
        `;
    });

    cartTotal.innerHTML =
    `<strong>Total: S/ ${total}</strong>`;
}

function toggleCart(){

    document
    .getElementById("cart-sidebar")
    .classList
    .toggle("active");
}