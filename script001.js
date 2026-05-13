// DATOS PROFESIONALES ADAPTADOS AL NUEVO DISEÑO
const categorias = [
    { nombre: 'Eléctricas', icono: '⚡', color: '#C8102E' },
    { nombre: 'Manuales', icono: '🛠️', color: '#C8102E' },
    { nombre: 'Tornillería', icono: '🔩', color: '#C8102E' },
    { nombre: 'Medición', icono: '📐', color: '#C8102E' },
    { nombre: 'Seguridad', icono: '🦺', color: '#C8102E' },
    { nombre: 'Pintura', icono: '🎨', color: '#C8102E' }
];

const productosDestacados = [
    { 
        id: 1, 
        marca: 'DEWALT',
        nombre: 'Taladro Inalámbrico 20V Max Litio', 
        sku: 'SKU: DCD771C2',
        precio: 299.99, 
        precioAntes: 350.00,
        img: 'https://via.placeholder.com/400x400/1A1A1A/FFFFFF?text=TALADRO+DEWALT', 
        categoria: 'Eléctricas', 
        oferta: true,
        descripcion: 'Taladro atornillador compacto de 20V. Diseño ligero y de alto rendimiento, ideal para espacios reducidos. Incluye 2 baterías y cargador.'
    },
    { 
        id: 2, 
        marca: 'BOSCH',
        nombre: 'Martillo Demoledor SDS Max 1500W', 
        sku: 'SKU: GSH 11 E',
        precio: 450.00, 
        precioAntes: null,
        img: 'https://via.placeholder.com/400x400/1A1A1A/FFFFFF?text=MARTILLO+BOSCH', 
        categoria: 'Eléctricas', 
        oferta: false,
        descripcion: 'Especialista en perforación y cincelado extremo. Energía de impacto de 16.8 J para una alta tasa de remoción de material.'
    },
    { 
        id: 3, 
        marca: 'STANLEY',
        nombre: 'Cinta Métrica Láser Digital 50m', 
        sku: 'SKU: STHT77139',
        precio: 189.99, 
        precioAntes: 220.00,
        img: 'https://via.placeholder.com/400x400/1A1A1A/FFFFFF?text=WINCHA+LASER', 
        categoria: 'Medición', 
        oferta: true,
        descripcion: 'Medidor de distancia láser con alcance de 50 metros. Calcula área, volumen y usa funciones pitagóricas. Pantalla retroiluminada.'
    },
    { 
        id: 4, 
        marca: '3M',
        nombre: 'Casco de Seguridad H-700 Dieléctrico', 
        sku: 'SKU: H-701R',
        precio: 45.50, 
        precioAntes: null,
        img: 'https://via.placeholder.com/400x400/1A1A1A/FFFFFF?text=CASCO+3M', 
        categoria: 'Seguridad', 
        oferta: false,
        descripcion: 'Casco de seguridad industrial clase E (Dieléctrico). Suspensión de 4 puntos con ajuste tipo rachet para mayor comodidad.'
    }
];

let carrito = [];

// INICIALIZAR
document.addEventListener('DOMContentLoaded', () => {
    cargarCategorias();
    cargarProductosDestacados();
    document.getElementById('cartIcon').onclick = abrirCarrito;
});

// CARGAR CATEGORÍAS EN EL GRID
function cargarCategorias() {
    const slider = document.getElementById('catSlider');
    slider.innerHTML = categorias.map(cat => `
        <div class="cat-card">
            <div class="cat-icon" style="color: ${cat.color}">${cat.icono}</div>
            <div class="cat-name">${cat.nombre}</div>
        </div>
    `).join('');
}

// CARGAR PRODUCTOS DESTACADOS
function cargarProductosDestacados() {
    const grid = document.getElementById('featuredProducts');
    grid.innerHTML = productosDestacados.map(producto => {
        const htmlOferta = producto.oferta ? `<div class="prod-badge">OFERTA</div>` : '';
        const htmlPrecioAntes = producto.precioAntes ? `<div class="precio-antes">S/ ${producto.precioAntes.toFixed(2)}</div>` : '<div></div>';
        
        return `
        <div class="producto-card">
            <div class="prod-img" onclick="abrirDetalle(${producto.id})">
                ${htmlOferta}
                <img src="${producto.img}" alt="${producto.nombre}">
            </div>
            <div class="prod-info">
                <div class="prod-marca">${producto.marca}</div>
                <div class="prod-nombre" onclick="abrirDetalle(${producto.id})">${producto.nombre}</div>
                <div class="prod-sku">${producto.sku}</div>
                <div class="prod-precio">
                    <div>
                        ${htmlPrecioAntes}
                        <div class="precio-valor"><span class="precio-moneda">S/</span>${producto.precio.toFixed(2)}</div>
                    </div>
                    <button class="btn-carrito" onclick="agregarCarrito(${producto.id})">+ Carrito</button>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// ── LOGICA DE MODAL DE DETALLES DEL PRODUCTO (QUICK VIEW) ──
function abrirDetalle(id) {
    const producto = productosDestacados.find(p => p.id === id);
    if(!producto) return;

    const body = document.getElementById('productDetailBody');
    body.innerHTML = `
        <div class="detail-img-container">
            <img src="${producto.img}" alt="${producto.nombre}">
        </div>
        <div class="detail-info">
            <div class="prod-marca" style="color:var(--rojo); font-weight:700;">${producto.marca}</div>
            <h2>${producto.nombre}</h2>
            <div class="prod-sku" style="color:#666;">${producto.sku}</div>
            <p class="detail-desc">${producto.descripcion}</p>
            <div class="detail-price">S/ ${producto.precio.toFixed(2)}</div>
            <button class="btn-primary" onclick="agregarCarrito(${producto.id}); cerrarDetalle();" style="width:fit-content;">
                <i class="fas fa-cart-plus"></i> Agregar al Carrito
            </button>
        </div>
    `;
    document.getElementById('productModal').style.display = 'block';
}

function cerrarDetalle() {
    document.getElementById('productModal').style.display = 'none';
}

// ── LOGICA DEL CARRITO ──
function agregarCarrito(id) {
    const producto = productosDestacados.find(p => p.id === id);
    carrito.push(producto);
    actualizarCarritoUI();
    mostrarNotificacion(`${producto.nombre} agregado al carrito`, 'success');
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
        body.innerHTML = '<p style="text-align:center;padding:2rem;color:#777;">Tu carrito está vacío</p>';
        document.getElementById('cartTotal').textContent = '0.00';
        return;
    }
    
    body.innerHTML = carrito.map((item, index) => `
        <div class="cart-item">
            <img src="${item.img}" alt="${item.nombre}">
            <div class="cart-item-info">
                <h4>${item.nombre}</h4>
                <p>S/ ${item.precio.toFixed(2)}</p>
            </div>
            <button class="btn-remove" onclick="quitarDelCarrito(${index})" title="Eliminar">
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
    if (carrito.length === 0) {
        mostrarNotificacion('El carrito está vacío', 'error');
        return;
    }
    
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    let mensaje = `¡Hola TITAN CENTER! 👋\nQuiero hacer el siguiente pedido:\n\n`;
    
    carrito.forEach(item => {
        mensaje += `🔸 *${item.nombre}*\n   SKU: ${item.sku.replace('SKU: ', '')} - S/ ${item.precio.toFixed(2)}\n`;
    });
    
    mensaje += `\n*TOTAL: S/ ${total.toFixed(2)}*\n\nPor favor indíquenme los pasos para el pago y envío.`;
    
    window.open(`https://wa.me/51991234567?text=${encodeURIComponent(mensaje)}`, '_blank');
}

// ── NOTIFICACIONES ──
function mostrarNotificacion(mensaje, tipo) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed; top: 100px; right: 20px;
        background: ${tipo === 'success' ? 'var(--rojo)' : '#333'};
        color: white; padding: 1rem 1.5rem; border-radius: 4px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 3000;
        animation: slideInRight 0.3s ease; font-weight: 600; font-size: 13px;
        border-left: 4px solid ${tipo === 'success' ? '#fff' : 'var(--rojo)'};
    `;
    notif.innerHTML = `<i class="fas ${tipo === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> &nbsp; ${mensaje}`;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.opacity = '0';
        notif.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// CERRAR MODALES CLIC FUERA
window.onclick = (e) => {
    if (e.target.id === 'cartModal') cerrarCarrito();
    if (e.target.id === 'productModal') cerrarDetalle();
};