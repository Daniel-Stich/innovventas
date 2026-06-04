const products = [

{
    id: 1,
    nombre: "Laptop Gamer Pro",
    precio: 4500,
    imagen: "assets/images/laptop-gamer.png",
    descripcion: "Intel i7, 16GB RAM, SSD 1TB"
},

{
    id: 2,
    nombre: "Smartphone X",
    precio: 3200,
    imagen: "assets/images/smartphone-x.png",
    descripcion: "256GB, Cámara 108MP"
},

{
    id: 3,
    nombre: "Monitor 4K",
    precio: 1800,
    imagen: "assets/images/monitor-4k.png",
    descripcion: "32 pulgadas UHD"
},

{
    id: 4,
    nombre: "Audífonos Pro",
    precio: 650,
    imagen: "assets/images/audifonos-pro.png",
    descripcion: "Cancelación de ruido"
},

{
    id: 5,
    nombre: "Smartwatch",
    precio: 950,
    imagen: "assets/images/smartwatch.png",
    descripcion: "Monitoreo de salud"
},

{
    id: 6,
    nombre: "Teclado Mecánico",
    precio: 350,
    imagen: "assets/images/teclado-mecanico.png",
    descripcion: "RGB Switch Blue"
}

];

function loadProducts(){

    const container =
    document.getElementById("products-container");

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `

        <div class="product-card">

            <div class="product-image">
            <img src="${product.imagen}" alt="${product.nombre}">
            </div>

            <h3>${product.nombre}</h3>

            <p>${product.descripcion}</p>

            <div class="price">
                S/ ${product.precio}
            </div>

            <button
                class="btn-primary"
                onclick="addToCart('${product.nombre}', ${product.precio})">

                Agregar al carrito

            </button>

        </div>

        `;
    });
}

window.onload = loadProducts;