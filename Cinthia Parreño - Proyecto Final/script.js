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


function actualizarCarrito() {
    carritoProductos.innerHTML = '';
    let total = 0;

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

    totalCarrito.textContent = total.toFixed(2);

    contadorCarrito.textContent = carrito.length;

    if (carrito.length > 0) {
        vaciarCarritoBtn.style.display = 'inline-block';
        realizarPedidoBtn.style.display = 'inline-block';
    } else {
        vaciarCarritoBtn.style.display = 'none';
        realizarPedidoBtn.style.display = 'none';
    }
}

carritoNav.addEventListener('click', () => {
    modalCarrito.style.display = 'flex';
    actualizarCarrito();
});

cerrarCarrito.addEventListener('click', () => {
    modalCarrito.style.display = 'none';
});

botonesAgregarCarrito.forEach(button => {
    button.addEventListener('click', () => {
        const productoElement = button.closest('.sofa-item');
        const producto = {
            nombre: productoElement.getAttribute('data-nombre'),
            precio: productoElement.getAttribute('data-precio')
        };
        
        carrito.push(producto);
        actualizarCarrito();
    });
});

carritoProductos.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar-producto')) {
        const index = e.target.getAttribute('data-index');
        carrito.splice(index, 1);
        actualizarCarrito();
    }
});

vaciarCarritoBtn.addEventListener('click', () => {
    carrito.length = 0;
    actualizarCarrito();
});

realizarPedidoBtn.addEventListener('click', () => {
    alert('Pedido realizado con éxito!');
    carrito.length = 0;
    actualizarCarrito();
});
