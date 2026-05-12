// PRODUCTOS por categoría (TUS IMÁGENES)
const productos = {
    'Herramientas Eléctricas': [
        {id: 1, nombre: 'Taladro 20V', precio: 299, img: 'imagenes/electricas/taladro.jpg'},
        {id: 2, nombre: 'Sierra Caladora', precio: 189, img: 'imagenes/electricas/sierra.jpg'}
    ],
    'Herramientas Manuales': [
        {id: 3, nombre: 'Martillo Profesional', precio: 45, img: 'imagenes/manuales/martillo.jpg'},
        {id: 4, nombre: 'Llave Inglesa 12"', precio: 28, img: 'imagenes/manuales/llave.jpg'}
    ],
    'Tornillería': [
        {id: 5, nombre: 'Tornillos M6 (100u)', precio: 12, img: 'imagenes/tornillos/tornillos.jpg'},
        {id: 6, nombre: 'Tuercas M8 (50u)', precio: 8, img: 'imagenes/tornillos/tuercas.jpg'}
    ],
    'Medición': [
        {id: 7, nombre: 'Cinta Métrica 5m', precio: 15, img: 'imagenes/medicion/cinta.jpg'},
        {id: 8, nombre: 'Nivel Láser', precio: 450, img: 'imagenes/medicion/nivel.jpg'}
    ]
};

// CARRITO
let carrito = [];

// INICIALIZAR
document.addEventListener('DOMContentLoaded', function() {
    cargarCategorias();
    mostrarCategoria('Herramientas Eléctricas'); // Categoría por defecto
    document.querySelector('.cart').onclick = abrirCarrito;
    document.querySelector('.close').onclick = cerrarCarrito;
});

// CARGAR BOTONES CATEGORÍAS
function cargarCategorias() {
    const contenedor = document.getElementById('catButtons');
    Object.keys(productos).forEach(categoria => {
        const btn = document.createElement('button');
        btn.className = 'cat-btn';
        btn.textContent = categoria;
        btn.onclick = () => mostrarCategoria(categoria);
        contenedor.appendChild(btn);
    });
}

// MOSTRAR PRODUCTOS POR CATEGORÍA
function mostrarCategoria(categoria) {
    const productosCat = productos[categoria];
    const grid = document.getElementById('products');
    
    // Marcar botón activo
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent === categoria);
    });
    
    // Generar HTML productos
    grid.innerHTML = `
        <div class="products-grid">
            ${productosCat.map(producto => `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${producto.img}" alt="${producto.nombre}" 
                             onerror="this.src='https://via.placeholder.com/300x250/ddd?text=🛠️'">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${producto.nombre}</h3>
                        <div class="product-price">$${producto.precio}</div>
                        <button class="add-cart" onclick="agregarCarrito(${producto.id})">
                            🛒 Agregar $${producto.precio}
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// AGREGAR AL CARRITO
function agregarCarrito(id) {
    const categoria = document.querySelector('.cat-btn.active').textContent;
    const producto = productos[categoria].find(p => p.id === id);
    
    carrito.push(producto);
    actualizarCarrito();
    
    // Efecto visual
    const btn = event.target;
    btn.textContent = '✅ Agregado!';
    btn.style.background = '#28a745';
    setTimeout(() => {
        btn.textContent = `🛒 Agregar $${producto.precio}`;
        btn.style.background = '';
    }, 1500);
}

// ACTUALIZAR CARRITO
function actualizarCarrito() {
    document.getElementById('cartCount').textContent = carrito.length;
    
    // Mostrar items en modal
    const contenedor = document.getElementById('cartItems');
    if (carrito.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center;padding:2rem;">Carrito vacío 😢</p>';
        document.getElementById('cartTotal').textContent = '0';
        return;
    }
    
    contenedor.innerHTML = carrito.map((item, index) => `
        <div class="cart-item">
            <img src="${item.img}" alt="${item.nombre}">
            <div>
                <strong>${item.nombre}</strong><br>
                $${item.precio}
            </div>
            <button onclick="quitarItem(${index})" style="background:#dc3545;color:white;border:none;padding:0.5rem 1rem;border-radius:5px;cursor:pointer;">Quitar</button>
        </div>
    `).join('');
    
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

// ABRIR/CERRAR CARRITO
function abrirCarrito() {
    document.getElementById('cartModal').style.display = 'block';
    actualizarCarrito();
}

function cerrarCarrito() {
    document.getElementById('cartModal').style.display = 'none';
}

// QUITAR ITEM
function quitarItem(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// COMPRAR
function buy() {
    if (carrito.length === 0) return;
    
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    alert(`¡Gracias por tu compra! 💰\nTotal: $${total.toFixed(2)}\n¡Redirigiendo al WhatsApp!`);
    
    // WhatsApp (personaliza tu número)
    const mensaje = `¡Hola! Quiero comprar:\n${carrito.map(item => `- ${item.nombre} $${item.precio}`).join('\n')}\nTotal: $${total.toFixed(2)}`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(mensaje)}`, '_blank');
    
    carrito = []; // Vaciar carrito
    cerrarCarrito();
    actualizarCarrito();
}

// CERRAR MODAL AL CLIC EXTERIOR
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};