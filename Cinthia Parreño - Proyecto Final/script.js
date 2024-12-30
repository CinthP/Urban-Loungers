// Obtención de elementos del DOM
const carrito = [];
const carritoNav = document.getElementById('ver-carrito');
const modalCarrito = document.getElementById('modal-carrito');
const cerrarCarrito = document.getElementById('cerrar-carrito');
const carritoProductos = document.getElementById('carrito-productos');
const totalCarrito = document.getElementById('total-carrito');
const contadorCarrito = document.getElementById('contador-carrito');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const realizarPedidoBtn = document.getElementById('realizar-pedido');
const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');

// Función para actualizar el carrito en el modal
function actualizarCarrito() {
    carritoProductos.innerHTML = ''; // Limpiar el contenido previo
    let total = 0;

    // Mostrar los productos en el carrito
    carrito.forEach((producto, index) => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('carrito-item');
        divProducto.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button class="eliminar-producto" data-index="${index}">Eliminar</button>
        `;
        carritoProductos.appendChild(divProducto);
        total += parseFloat(producto.precio);
    });

    // Actualizar el total
    totalCarrito.textContent = total.toFixed(2);

    // Actualizar el contador de carrito
    contadorCarrito.textContent = carrito.length;

    // Mostrar u ocultar los botones según el contenido del carrito
    if (carrito.length > 0) {
        vaciarCarritoBtn.style.display = 'inline-block';
        realizarPedidoBtn.style.display = 'inline-block';
    } else {
        vaciarCarritoBtn.style.display = 'none';
        realizarPedidoBtn.style.display = 'none';
    }
}

// Función para abrir el carrito
carritoNav.addEventListener('click', () => {
    modalCarrito.style.display = 'flex';
    actualizarCarrito(); // Actualiza el carrito al abrir el modal
});

// Función para cerrar el modal del carrito
cerrarCarrito.addEventListener('click', () => {
    modalCarrito.style.display = 'none';
});

// Función para agregar un producto al carrito
botonesAgregarCarrito.forEach(button => {
    button.addEventListener('click', () => {
        const productoElement = button.closest('.sofa-item');
        const producto = {
            nombre: productoElement.getAttribute('data-nombre'),
            precio: productoElement.getAttribute('data-precio')
        };
        
        carrito.push(producto); // Añadir el producto al carrito
        actualizarCarrito(); // Actualizar el carrito
    });
});

// Función para eliminar un producto del carrito
carritoProductos.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar-producto')) {
        const index = e.target.getAttribute('data-index');
        carrito.splice(index, 1); // Eliminar el producto del carrito
        actualizarCarrito(); // Actualizar el carrito
    }
});

// Función para vaciar el carrito
vaciarCarritoBtn.addEventListener('click', () => {
    carrito.length = 0; // Vaciar el carrito
    actualizarCarrito(); // Actualizar el carrito
});

// Función para realizar el pedido (simulación)
realizarPedidoBtn.addEventListener('click', () => {
    alert('Pedido realizado con éxito!');
    carrito.length = 0; // Vaciar el carrito después de realizar el pedido
    actualizarCarrito(); // Actualizar el carrito
});
