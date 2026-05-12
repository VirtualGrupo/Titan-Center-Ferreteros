// DATOS PROFESIONALES
const categorias = [
    { nombre: 'Eléctricas', icono: '🔌', color: '#e74c3c' },
    { nombre: 'Manuales', icono: '🔨', color: '#f39c12' },
    { nombre: 'Tornillos', icono: '🔩', color: '#3498db' },
    { nombre: 'Medición', icono: '📏', color: '#27ae60' },
    { nombre: 'Pintura', icono: '🎨', color: '#9b59b6' }
];

const productosDestacados = [
    { id: 1, nombre: 'Taladro Inalámbrico 20V', precio: 299.99, img: 'imagenes/electricas/taladro.jpg', categoria: 'Eléctricas', oferta: true },
    { id: 2, nombre: 'Martillo Demoledor', precio: 450.00, img: 'imagenes/manuales/martillo.jpg', categoria: 'Manuales', oferta: true },
    { id: 3, nombre: 'Cinta Métrica Láser', precio: 189.99, img: 'imagenes/medicion/laser.jpg', categoria: 'Medición', oferta: false }
];

let carrito = [];

// INICIALIZAR
document.addEventListener('DOMContentLoaded', () => {
    cargarCategorias();
    cargarProductosDestacados();
    initScrollHeader();
    initMenuMobile();
    document.getElementById('cartIcon').onclick = abrirCarrito;
    document.querySelector('.cart-close').onclick = cerrarCarrito;
});

// CATEGORÍAS SLIDER
function cargarCategorias() {
    const slider = document.getElementById('catSlider');
    slider.innerHTML = categorias.map(cat => `
        <div class="cat-card" onclick="filtrarCategoria('${cat.nombre}')">
            <div class="cat-icon" style="color: ${cat.color}">${cat.icono}</div>
            <h3>${cat.nombre}</h3>
        </div>
    `).join('');
}

// PRODUCTOS DESTACADOS
function cargarProductosDestacados() {
    const grid = document.getElementById('featuredProducts');
    grid.innerHTML = productosDestacados.map(producto => `
        <div class="product-card">
            ${producto.oferta ? '<div class="product-badge">Oferta</div>' : ''}
            <div class="product-image">
                <img src="${producto.img}" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/400x300/e74c3c/fff?text=🛠️'">
            </div>
            <div class="product-info">
                <h3 class="product-name">${producto.nombre}</h3>
                <div class="product-price">S/ ${producto.precio.toFixed(2)}</div>
                <div class="product-rating">
                    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                    <span>4.8 (127)</span>
                </div>
                <button class="add-to-cart" onclick="agregarCarrito(${producto.id})">
                    <i class="fas fa-cart-plus"></i> Agregar al carrito
                </button>
            </div>
        </div>
    `).join('');
}

// HEADER SCROLL
function initScrollHeader() {
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255,255,255,0.98)';
        } else {
            header.style.background = 'rgba(255,255,255,0.95)';
        }
    });
}

// MENU MÓVIL
function initMenuMobile() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.onclick = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    };
}

// CARRITO
function agregarCarrito(id) {
    const producto = productosDestacados.find(p => p.id === id);
    carrito.push(producto);
    actualizarCarritoUI();
    mostrarNotificacion('Producto agregado al carrito!', 'success');
}

function actualizarCarritoUI() {
    document.getElementById('cartCount').textContent = carrito.length;
}

function abrirCarrito() {
    document.getElementById('cartModal').style.display = 'block';
    actualizarCarritoModal();
}

function cerrarCarrito() {
    document.getElementById('cartModal').style.display = 'none';
}

function actualizarCarritoModal() {
    const body = document.getElementById('cartBody');
    if (carrito.length === 0) {
        body.innerHTML = '<p style="text-align:center;padding:3rem;color:#666;">Tu carrito está vacío</p>';
        document.getElementById('cartTotal').textContent = '0.00';
        return;
    }
    
    body.innerHTML = carrito.map((item, index) => `
        <div class="cart-item">
            <img src="${item.img}" alt="${item.nombre}">
            <div style="flex:1;">
                <h4>${item.nombre}</h4>
                <p>S/ ${item.precio.toFixed(2)}</p>
            </div>
            <button onclick="quitarDelCarrito(${index})" style="background:#dc3545;color:white;border:none;padding:0.5rem 1rem;border-radius:8px;">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

function quitarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarritoModal();
    actualizarCarritoUI();
}

function checkout() {
    if (carrito.length === 0) return;
    
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    const mensaje = `¡Hola! Quiero comprar:\n\n${carrito.map(item => `• ${item.nombre} - S/ ${item.precio}`).join('\n')}\n\nTotal: S/ ${total.toFixed(2)}`;
    
    window.open(`https://wa.me/51991234567?text=${encodeURIComponent(mensaje)}`, '_blank');
    mostrarNotificacion('¡Redirigiendo a WhatsApp!', 'success');
}

function mostrarNotificacion(mensaje, tipo) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${tipo === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideInRight 0.4s ease;
    `;
    notif.textContent = mensaje;
    document.body.appendChild(notif);
    
    setTimeout(() => notif.remove(), 3000);
}

// CERRAR MODAL CLIC FUERA
window.onclick = (e) => {
    if (e.target.id === 'cartModal') cerrarCarrito();
};