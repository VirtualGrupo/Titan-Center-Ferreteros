/* ═══════════════════════════════════════════════════════════
   TITAN CENTER — script.js
   Interactividad completa: carrito, modales, búsqueda, favoritos
════════════════════════════════════════════════════════════ */

/* ══════════════════════
   DATOS
══════════════════════ */
const categorias = [
  { id: 'electricas',  nombre: 'Herramientas Eléctricas', icono: '⚡' },
  { id: 'manuales',    nombre: 'Herramientas Manuales',   icono: '🔨' },
  { id: 'medicion',    nombre: 'Medición y Trazado',      icono: '📏' },
  { id: 'tornillos',   nombre: 'Tornillería',              icono: '🔩' },
  { id: 'pintura',     nombre: 'Pintura y Acabados',       icono: '🎨' },
  { id: 'seguridad',   nombre: 'Seguridad Industrial',     icono: '🦺' },
  { id: 'soldadura',   nombre: 'Soldadura',                icono: '🔥' },
  { id: 'plomeria',    nombre: 'Plomería',                 icono: '🚰' },
  { id: 'fijaciones',  nombre: 'Fijaciones y Anclajes',   icono: '🔗' },
  { id: 'abrasivos',   nombre: 'Abrasivos',                icono: '💎' },
  { id: 'epp',         nombre: 'EPP Certificado',          icono: '⛑️' },
  { id: 'accesorios',  nombre: 'Accesorios',               icono: '🛠️' },
];

const marcas = [
  'BOSCH','DEWALT','MAKITA','STANLEY','3M','HILTI',
  'TRUPER','SPIT','FLUKE','HONEYWELL','PECAL','WÜRTH'
];

const productos = [
  {
    id: 1, marca: 'BOSCH', nombre: 'Taladro inalámbrico 20V GSB 18V-21', sku: 'SKU: 100123 | GSB18V-21',
    precio: 299.90, precioAntes: 360.00, icono: '⚡',
    categoria: 'electricas', tag: 'oferta',
    desc: 'Taladro/atornillador a batería de 18V con mandril de 13mm, 2 velocidades y función martillo. Ideal para obras profesionales.',
    specs: [
      ['Voltaje', '18V / 20V max'],
      ['Velocidades', '2 velocidades mecánicas'],
      ['Mandril', '13mm autoapretante'],
      ['Par máximo', '55 Nm'],
      ['Peso', '1.9 kg (con batería)'],
      ['Incluye', '2 baterías + cargador + maletín'],
    ]
  },
  {
    id: 2, marca: 'MAKITA', nombre: 'Amoladora angular 4½" 720W GA4530', sku: 'SKU: 100456 | GA4530',
    precio: 189.90, precioAntes: null, icono: '🔥',
    categoria: 'electricas', tag: 'destacado',
    desc: 'Amoladora angular profesional de 720W con disco de 4½". Diseño ergonómico y protección contra sobrecargas.',
    specs: [
      ['Potencia', '720W'],
      ['Disco', '4½" (115mm)'],
      ['RPM', '11,000 rpm'],
      ['Peso', '1.6 kg'],
      ['Protección', 'IP20'],
    ]
  },
  {
    id: 3, marca: 'DEWALT', nombre: 'Sierra circular 7¼" 1400W DWE575', sku: 'SKU: 100789 | DWE575',
    precio: 459.90, precioAntes: 520.00, icono: '⚙️',
    categoria: 'electricas', tag: 'oferta',
    desc: 'Sierra circular de 7¼" con potente motor de 1,400W. Corte limpio y preciso para madera, laminados y más.',
    specs: [
      ['Potencia', '1,400W'],
      ['Disco', '7¼" (184mm)'],
      ['Profundidad corte', '67mm a 90°'],
      ['RPM', '5,800 rpm'],
      ['Peso', '3.4 kg'],
    ]
  },
  {
    id: 4, marca: 'STANLEY', nombre: 'Cinta métrica FatMax 8m × 32mm', sku: 'SKU: 100234 | FMHT33866',
    precio: 49.90, precioAntes: null, icono: '📏',
    categoria: 'medicion', tag: 'nuevo',
    desc: 'Cinta métrica profesional FatMax de 8m con hoja de 32mm, revestimiento Blade Armor para mayor durabilidad.',
    specs: [
      ['Longitud', '8 metros'],
      ['Ancho hoja', '32mm'],
      ['Material', 'Acero con Blade Armor'],
      ['Standout', '3.5m'],
      ['Garantía', '10 años'],
    ]
  },
  {
    id: 5, marca: 'HILTI', nombre: 'Taladradora rotativa TE 2 SDS-Plus', sku: 'SKU: 100567 | TE2-A',
    precio: 1290.00, precioAntes: null, icono: '🔨',
    categoria: 'electricas', tag: 'destacado',
    desc: 'Taladradora rotativa ligera con sistema SDS-Plus. Ideal para concreto y mampostería. Calidad profesional Hilti.',
    specs: [
      ['Potencia', '650W'],
      ['Sistema', 'SDS-Plus'],
      ['Impactos/min', '4,500'],
      ['Diámetro máx.', '28mm en concreto'],
      ['Peso', '2.7 kg'],
    ]
  },
  {
    id: 6, marca: '3M', nombre: 'Respirador semifacial 6200 + filtros 6003', sku: 'SKU: 100890 | 6200-6003',
    precio: 89.90, precioAntes: 110.00, icono: '🦺',
    categoria: 'seguridad', tag: 'oferta',
    desc: 'Respirador de media cara con filtros 6003 para vapores orgánicos y gases ácidos. Certificado NIOSH N95.',
    specs: [
      ['Talla', 'M (tallas S, M, L disponibles)'],
      ['Filtros', '6003 – vapores y gases ácidos'],
      ['Certificación', 'NIOSH / CE'],
      ['Uso', 'Pintura, solventes, productos químicos'],
    ]
  },
  {
    id: 7, marca: 'TRUPER', nombre: 'Martillo demoledor 5Kg mango fibra', sku: 'SKU: 100345 | MAPO-5F',
    precio: 69.90, precioAntes: null, icono: '🔨',
    categoria: 'manuales', tag: 'destacado',
    desc: 'Martillo de demolición de 5kg con cabeza forjada en acero C60 y mango de fibra de vidrio antivibración.',
    specs: [
      ['Peso cabeza', '5 kg'],
      ['Material', 'Acero forjado C60'],
      ['Mango', 'Fibra de vidrio'],
      ['Longitud', '90 cm'],
    ]
  },
  {
    id: 8, marca: 'WÜRTH', nombre: 'Tornillos autorroscantes Spax 4×40mm (200u)', sku: 'SKU: 100678 | SPAX4x40',
    precio: 29.90, precioAntes: null, icono: '🔩',
    categoria: 'tornillos', tag: 'nuevo',
    desc: 'Tornillos SPAX universales de alta calidad con punta perforante 4Cut. Rosca única para madera y materiales compuestos.',
    specs: [
      ['Medida', '4 × 40mm'],
      ['Cantidad', '200 unidades'],
      ['Material', 'Acero zincado C1022'],
      ['Punta', '4Cut perforante'],
      ['Cabeza', 'Plana con Torx T20'],
    ]
  },
];

/* ══════════════════════
   ESTADO GLOBAL
══════════════════════ */
let carrito    = JSON.parse(localStorage.getItem('tc_carrito') || '[]');
let favoritos  = JSON.parse(localStorage.getItem('tc_favoritos') || '[]');
let tabActual  = 'todos';
let navActual  = 'todos';

/* ══════════════════════
   INIT
══════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderCategorias();
  renderProductos();
  renderMarcas();
  initSearch();
  initHeader();
  animarStats();
  actualizarBadges();
});

/* ══════════════════════
   RENDER CATEGORÍAS
══════════════════════ */
function renderCategorias() {
  const grid = document.getElementById('catsGrid');
  if (!grid) return;
  grid.innerHTML = categorias.map(c => `
    <div class="cat-card" onclick="filtrarNav(null,'${c.id}')">
      <div class="cat-icon">${c.icono}</div>
      <div class="cat-name">${c.nombre}</div>
    </div>
  `).join('');
}

/* ══════════════════════
   RENDER PRODUCTOS
══════════════════════ */
function renderProductos(filtro) {
  const grid = document.getElementById('productosGrid');
  if (!grid) return;

  let lista = [...productos];

  // filtro por nav (categoría)
  if (navActual !== 'todos') {
    lista = lista.filter(p => p.categoria === navActual);
  }

  // filtro por tab
  if (filtro && filtro !== 'todos') {
    lista = lista.filter(p => p.tag === filtro);
  } else if (tabActual !== 'todos') {
    lista = lista.filter(p => p.tag === tabActual);
  }

  if (lista.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#555;">
        <div style="font-size:48px;margin-bottom:12px;">🔍</div>
        <div style="font-size:14px;">No hay productos en esta categoría.</div>
      </div>`;
    return;
  }

  grid.innerHTML = lista.map((p, i) => {
    const esFav  = favoritos.includes(p.id);
    const enCart = carrito.find(c => c.id === p.id);
    const badgeHTML = p.tag === 'oferta'    ? '<span class="prod-badge">OFERTA</span>' :
                      p.tag === 'nuevo'     ? '<span class="prod-badge nuevo">NUEVO</span>' :
                      p.tag === 'destacado' ? '<span class="prod-badge dest">⭐ TOP</span>' : '';
    const antesHTML = p.precioAntes
      ? `<div class="precio-antes">S/ ${p.precioAntes.toFixed(2)}</div>` : '';
    return `
      <div class="producto-card" style="animation-delay:${i * 0.05}s">
        <div class="prod-img" onclick="abrirProducto(${p.id})">
          ${badgeHTML}
          <button class="prod-fav ${esFav ? 'active' : ''}"
            onclick="toggleFav(event,${p.id})"
            title="${esFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}">
            <i class="fas fa-heart"></i>
          </button>
          ${p.icono}
          <div class="prod-quickview">👁 Ver detalle</div>
        </div>
        <div class="prod-info">
          <div class="prod-marca">${p.marca}</div>
          <div class="prod-nombre">${p.nombre}</div>
          <div class="prod-sku">${p.sku}</div>
          <div class="prod-precio">
            <div>
              ${antesHTML}
              <div class="precio-valor"><span class="precio-moneda">S/</span>${p.precio.toFixed(2)}</div>
            </div>
            <button class="btn-carrito ${enCart ? 'added' : ''}" onclick="agregarCarrito(${p.id})">
              ${enCart ? '✓ Agregado' : '+ Carrito'}
            </button>
          </div>
        </div>
      </div>`;
  }).join('');
}

/* ══════════════════════
   RENDER MARCAS
══════════════════════ */
function renderMarcas() {
  const grid = document.getElementById('marcasGrid');
  if (!grid) return;
  grid.innerHTML = marcas.map(m => `
    <div class="marca-card" onclick="toast('Filtrando por ${m}','info')">
      <div class="marca-nombre">${m}</div>
    </div>
  `).join('');
}

/* ══════════════════════
   NAV FILTER
══════════════════════ */
function filtrarNav(el, cat) {
  // actualiza activo
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');

  navActual = cat;
  tabActual = 'todos';
  document.querySelectorAll('.prod-tab').forEach(t => t.classList.remove('active'));
  const primerTab = document.querySelector('.prod-tab');
  if (primerTab) primerTab.classList.add('active');

  renderProductos();
  document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ══════════════════════
   TABS
══════════════════════ */
function cambiarTab(el, tab) {
  document.querySelectorAll('.prod-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  tabActual = tab;
  renderProductos();
}

/* ══════════════════════
   FAVORITOS
══════════════════════ */
function toggleFav(e, id) {
  e.stopPropagation();
  const idx = favoritos.indexOf(id);
  if (idx > -1) {
    favoritos.splice(idx, 1);
    toast('Eliminado de favoritos');
  } else {
    favoritos.push(id);
    toast('¡Agregado a favoritos! ❤️', 'success');
  }
  localStorage.setItem('tc_favoritos', JSON.stringify(favoritos));
  actualizarBadges();
  renderProductos();
}

function abrirFavoritos() {
  const overlay = document.getElementById('favModalOverlay');
  const body    = document.getElementById('favBody');
  overlay.classList.add('active');

  if (favoritos.length === 0) {
    body.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">❤️</div><p>Aún no tienes favoritos.</p></div>`;
    return;
  }
  const lista = productos.filter(p => favoritos.includes(p.id));
  body.innerHTML = lista.map(p => `
    <div class="cart-item">
      <div class="cart-item-icon">${p.icono}</div>
      <div class="cart-item-info">
        <div class="cart-item-marca">${p.marca}</div>
        <div class="cart-item-nombre">${p.nombre}</div>
        <div class="cart-item-precio">S/ ${p.precio.toFixed(2)}</div>
      </div>
      <button class="cart-item-remove" onclick="toggleFav(event,${p.id})">
        <i class="fas fa-heart" style="color:var(--rojo)"></i>
      </button>
      <button class="btn-carrito" style="margin-left:6px" onclick="agregarCarrito(${p.id});renderFavBody()">
        + Carrito
      </button>
    </div>
  `).join('');
}

function cerrarFavoritos() {
  document.getElementById('favModalOverlay').classList.remove('active');
}
function cerrarFavOverlay(e) {
  if (e.target.id === 'favModalOverlay') cerrarFavoritos();
}
function renderFavBody() { /* re-render dentro del modal */ abrirFavoritos(); }

/* ══════════════════════
   CARRITO
══════════════════════ */
function agregarCarrito(id) {
  const prod = productos.find(p => p.id === id);
  if (!prod) return;

  const item = carrito.find(c => c.id === id);
  if (item) {
    item.qty += 1;
  } else {
    carrito.push({ ...prod, qty: 1 });
  }
  guardarCarrito();
  actualizarBadges();
  renderProductos();
  toast(`${prod.nombre.substring(0, 30)}… añadido al carrito 🛒`, 'success');

  // animación badge
  const badge = document.getElementById('cartBadge');
  badge.classList.remove('pop');
  void badge.offsetWidth;
  badge.classList.add('pop');
}

function abrirCarrito() {
  document.getElementById('cartModalOverlay').classList.add('active');
  renderCarritoModal();
}
function cerrarCarrito() {
  document.getElementById('cartModalOverlay').classList.remove('active');
}
function cerrarCartOverlay(e) {
  if (e.target.id === 'cartModalOverlay') cerrarCarrito();
}

function renderCarritoModal() {
  const body  = document.getElementById('cartBody');
  const total = document.getElementById('cartTotal');

  if (carrito.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Tu carrito está vacío.</p>
      </div>`;
    total.textContent = '0.00';
    return;
  }

  body.innerHTML = carrito.map(item => `
    <div class="cart-item">
      <div class="cart-item-icon">${item.icono}</div>
      <div class="cart-item-info">
        <div class="cart-item-marca">${item.marca}</div>
        <div class="cart-item-nombre">${item.nombre}</div>
        <div class="cart-item-precio">S/ ${(item.precio * item.qty).toFixed(2)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="cambiarQty(${item.id},-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="cambiarQty(${item.id},1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="quitarItem(${item.id})" title="Eliminar">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `).join('');

  const suma = carrito.reduce((s, i) => s + i.precio * i.qty, 0);
  total.textContent = suma.toFixed(2);
}

function cambiarQty(id, delta) {
  const item = carrito.find(c => c.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  guardarCarrito();
  actualizarBadges();
  renderCarritoModal();
}

function quitarItem(id) {
  carrito = carrito.filter(c => c.id !== id);
  guardarCarrito();
  actualizarBadges();
  renderCarritoModal();
  renderProductos();
  toast('Producto eliminado del carrito');
}

function vaciarCarrito() {
  if (carrito.length === 0) return;
  if (!confirm('¿Vaciar el carrito?')) return;
  carrito = [];
  guardarCarrito();
  actualizarBadges();
  renderCarritoModal();
  renderProductos();
  toast('Carrito vaciado');
}

function checkout() {
  if (carrito.length === 0) {
    toast('El carrito está vacío', 'info');
    return;
  }
  const total = carrito.reduce((s, i) => s + i.precio * i.qty, 0);
  const lineas = carrito.map(i => `• ${i.nombre} (x${i.qty}) — S/ ${(i.precio * i.qty).toFixed(2)}`).join('\n');
  const msg = `¡Hola! Quiero realizar el siguiente pedido:\n\n${lineas}\n\n*TOTAL: S/ ${total.toFixed(2)}*\n\n¿Pueden confirmarme disponibilidad y tiempo de entrega?`;
  window.open(`https://wa.me/51991234567?text=${encodeURIComponent(msg)}`, '_blank');
}

function guardarCarrito() {
  localStorage.setItem('tc_carrito', JSON.stringify(carrito));
}

function actualizarBadges() {
  const totalItems = carrito.reduce((s, i) => s + i.qty, 0);
  const cartBadge  = document.getElementById('cartBadge');
  if (cartBadge) cartBadge.textContent = totalItems;

  const favCount = document.getElementById('favCount');
  if (favCount) {
    favCount.textContent = favoritos.length;
    favCount.style.display = favoritos.length > 0 ? 'flex' : 'none';
  }
}

/* ══════════════════════
   MODAL PRODUCTO (detalle)
══════════════════════ */
function abrirProducto(id) {
  const p = productos.find(x => x.id === id);
  if (!p) return;

  const esFav = favoritos.includes(p.id);
  const antesHTML = p.precioAntes
    ? `<div class="modal-prod-antes">Antes: S/ ${p.precioAntes.toFixed(2)}</div>` : '';
  const specsHTML = p.specs
    ? `<div class="modal-prod-specs"><table>${p.specs.map(([k,v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')}</table></div>` : '';

  const html = `
    <div class="modal-producto">
      <div class="modal-prod-img">${p.icono}</div>
      <div class="modal-prod-body">
        <div class="modal-prod-marca">${p.marca}</div>
        <div class="modal-prod-nombre">${p.nombre}</div>
        <div class="modal-prod-sku">${p.sku}</div>
        <div class="modal-prod-desc">${p.desc}</div>
        ${specsHTML}
        ${antesHTML}
        <div class="modal-prod-precio"><span style="font-size:18px;color:#888;margin-right:4px">S/</span>${p.precio.toFixed(2)}</div>
        <div class="modal-btns">
          <button class="modal-btn-carrito" onclick="agregarCarrito(${p.id});toast('Añadido al carrito','success')">
            <i class="fas fa-cart-plus"></i> Agregar al carrito
          </button>
          <button class="modal-btn-fav ${esFav ? 'active' : ''}" id="favBtn${p.id}"
            onclick="toggleFavModal(${p.id})">
            <i class="fas fa-heart"></i>
          </button>
        </div>
      </div>
    </div>`;

  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('active');
}

function toggleFavModal(id) {
  const idx = favoritos.indexOf(id);
  if (idx > -1) {
    favoritos.splice(idx, 1);
    toast('Eliminado de favoritos');
  } else {
    favoritos.push(id);
    toast('¡Añadido a favoritos! ❤️', 'success');
  }
  localStorage.setItem('tc_favoritos', JSON.stringify(favoritos));
  actualizarBadges();
  renderProductos();

  // actualizar botón dentro del modal
  const btn = document.getElementById(`favBtn${id}`);
  if (btn) btn.classList.toggle('active', favoritos.includes(id));
}

/* ══════════════════════
   MODAL GENÉRICO
══════════════════════ */
const contenidosModal = {
  cotizacion: () => `
    <div class="modal-form">
      <h2>Solicitar <span>Cotización</span></h2>
      <div class="form-row">
        <div class="form-group">
          <label>Nombre completo</label>
          <input type="text" placeholder="Juan Pérez">
        </div>
        <div class="form-group">
          <label>Empresa</label>
          <input type="text" placeholder="Mi Empresa S.A.C.">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Teléfono / WhatsApp</label>
          <input type="tel" placeholder="+51 999 000 000">
        </div>
        <div class="form-group">
          <label>Correo electrónico</label>
          <input type="email" placeholder="correo@empresa.pe">
        </div>
      </div>
      <div class="form-group">
        <label>Categoría de producto</label>
        <select>
          <option value="">Selecciona una categoría…</option>
          ${categorias.map(c => `<option>${c.nombre}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Descripción del pedido</label>
        <textarea placeholder="Indique los productos, cantidades y especificaciones que necesita…"></textarea>
      </div>
      <button class="modal-info-cta" onclick="enviarCotizacion()">
        <i class="fab fa-whatsapp"></i> Enviar por WhatsApp
      </button>
    </div>`,

  seguimiento: () => `
    <div class="modal-info">
      <div class="modal-info-header">
        <div class="modal-info-icon">📦</div>
        <div class="modal-info-title">Seguimiento de <span>Pedido</span></div>
      </div>
      <p>Ingresa tu número de pedido para conocer el estado de tu entrega en tiempo real.</p>
      <div class="form-group" style="margin-top:16px">
        <label>Número de pedido</label>
        <input type="text" placeholder="Ej: TC-2026-00123" id="nroPedido">
      </div>
      <button class="modal-info-cta" onclick="rastrearPedido()">Rastrear pedido →</button>
    </div>`,

  servicios: () => `
    <div class="modal-info">
      <div class="modal-info-header">
        <div class="modal-info-icon">🔧</div>
        <div class="modal-info-title">Nuestros <span>Servicios</span></div>
      </div>
      <p>Titan Center no solo vende herramientas, también ofrece soluciones integrales para tu negocio:</p>
      <ul>
        <li>Mantenimiento preventivo y correctivo de herramientas</li>
        <li>Proyectos de instalación y obras civiles</li>
        <li>Asesoría técnica especializada sin costo</li>
        <li>Capacitación en uso seguro de equipos</li>
        <li>Despacho express en Lima Metropolitana (24h)</li>
        <li>Crédito empresarial hasta 60 días</li>
      </ul>
      <button class="modal-info-cta" onclick="abrirModal('cotizacion')">Solicitar asesoría gratuita →</button>
    </div>`,

  cuenta: () => `
    <div class="modal-form">
      <h2>Mi <span>Cuenta</span></h2>
      <div class="form-group">
        <label>Correo electrónico</label>
        <input type="email" placeholder="correo@empresa.pe">
      </div>
      <div class="form-group">
        <label>Contraseña</label>
        <input type="password" placeholder="••••••••">
      </div>
      <button class="modal-info-cta" style="width:100%;margin-top:8px" onclick="toast('Función disponible próximamente','info')">
        Ingresar
      </button>
      <p style="text-align:center;margin-top:14px;font-size:13px;color:#666">
        ¿No tienes cuenta? <span style="color:var(--rojo);cursor:pointer" onclick="toast('Registro próximamente','info')">Regístrate gratis</span>
      </p>
    </div>`,

  faq: () => `
    <div class="modal-info">
      <div class="modal-info-header">
        <div class="modal-info-icon">❓</div>
        <div class="modal-info-title">Preguntas <span>Frecuentes</span></div>
      </div>
      <ul>
        <li>¿Hacen envíos a provincias? — Sí, a todo el Perú vía courier.</li>
        <li>¿Cuánto demora el despacho? — Lima: 24h. Provincias: 3–5 días hábiles.</li>
        <li>¿Tienen garantía los productos? — Sí, todos tienen garantía de fábrica.</li>
        <li>¿Aceptan crédito empresarial? — Sí, con evaluación previa sin costo.</li>
        <li>¿Puedo devolver un producto? — Sí, hasta 7 días después de la compra.</li>
        <li>¿Emiten factura? — Sí, factura electrónica y boleta de venta.</li>
      </ul>
      <button class="modal-info-cta" onclick="abrirModal('cotizacion')">¿Más dudas? Escríbenos →</button>
    </div>`,

  despacho: () => `
    <div class="modal-info">
      <div class="modal-info-header">
        <div class="modal-info-icon">🚚</div>
        <div class="modal-info-title">Políticas de <span>Despacho</span></div>
      </div>
      <p>Nos comprometemos a entregar tu pedido en el menor tiempo posible:</p>
      <ul>
        <li>Lima Metropolitana: despacho en 24h hábiles</li>
        <li>Provincias: 3 a 5 días hábiles vía courier certificado</li>
        <li>Compras mayores a S/ 500 tienen envío gratuito en Lima</li>
        <li>Seguimiento en tiempo real con número de guía</li>
        <li>Empaque seguro para herramientas frágiles</li>
      </ul>
    </div>`,

  devoluciones: () => `
    <div class="modal-info">
      <div class="modal-info-header">
        <div class="modal-info-icon">↩️</div>
        <div class="modal-info-title">Política de <span>Devoluciones</span></div>
      </div>
      <p>Tu satisfacción es nuestra prioridad. Si el producto no cumple tus expectativas:</p>
      <ul>
        <li>Devolución hasta 7 días calendario desde la recepción</li>
        <li>Producto debe estar sin uso, en su empaque original</li>
        <li>Defectos de fábrica se atienden durante el período de garantía</li>
        <li>Reembolso en el mismo método de pago (3–5 días hábiles)</li>
        <li>Cambio de producto disponible inmediatamente</li>
      </ul>
      <button class="modal-info-cta" onclick="abrirModal('cotizacion')">Iniciar devolución →</button>
    </div>`,

  quienes: () => `
    <div class="modal-info">
      <div class="modal-info-header">
        <div class="modal-info-icon">🏗️</div>
        <div class="modal-info-title">Quiénes <span>Somos</span></div>
      </div>
      <p>Titan Center Ferretero es una empresa peruana con más de 20 años de experiencia en el suministro de herramientas y materiales para la construcción e industria.</p>
      <p>Somos distribuidores autorizados de las principales marcas internacionales: Bosch, Makita, DeWalt, Stanley, 3M, Hilti, y muchas más.</p>
      <p>Contamos con 5 tiendas a nivel nacional y atendemos a más de 10,000 clientes entre contratistas, empresas constructoras e industrias de distintos sectores.</p>
      <ul>
        <li>+20 años en el mercado peruano</li>
        <li>5 tiendas en Lima y provincias</li>
        <li>15,000+ productos en stock permanente</li>
        <li>Crédito empresarial disponible</li>
      </ul>
    </div>`,

  trabajo: () => `
    <div class="modal-form">
      <h2>Trabaja con <span>Nosotros</span></h2>
      <p style="color:#999;font-size:13px;margin-bottom:20px">Únete al equipo Titan Center. Buscamos personas apasionadas y con vocación de servicio.</p>
      <div class="form-row">
        <div class="form-group">
          <label>Nombre completo</label>
          <input type="text" placeholder="Tu nombre">
        </div>
        <div class="form-group">
          <label>Teléfono</label>
          <input type="tel" placeholder="+51 999 000 000">
        </div>
      </div>
      <div class="form-group">
        <label>Puesto de interés</label>
        <select>
          <option>Vendedor de tienda</option>
          <option>Asesor técnico</option>
          <option>Almacenero</option>
          <option>Repartidor</option>
          <option>Administración</option>
        </select>
      </div>
      <div class="form-group">
        <label>Mensaje / Experiencia</label>
        <textarea placeholder="Cuéntanos brevemente tu experiencia…"></textarea>
      </div>
      <button class="modal-info-cta" onclick="toast('¡Postulación enviada! Te contactaremos pronto.','success');cerrarModal()">
        Enviar postulación →
      </button>
    </div>`,

  'srv-mantenimiento': () => `
    <div class="modal-info">
      <div class="modal-info-header">
        <div class="modal-info-icon">🔧</div>
        <div class="modal-info-title">Servicio de <span>Mantenimiento</span></div>
      </div>
      <p>Nuestro equipo técnico certificado realiza mantenimiento preventivo y correctivo para todo tipo de herramientas eléctricas y maquinaria de construcción.</p>
      <ul>
        <li>Diagnóstico gratuito en tienda</li>
        <li>Repuestos originales garantizados</li>
        <li>Tiempo de atención: 24–72h</li>
        <li>Garantía de 3 meses en la reparación</li>
        <li>Recojo y entrega a domicilio (Lima)</li>
      </ul>
      <button class="modal-info-cta" onclick="abrirModal('cotizacion')">Solicitar servicio →</button>
    </div>`,

  'srv-proyectos': () => `
    <div class="modal-info">
      <div class="modal-info-header">
        <div class="modal-info-icon">📐</div>
        <div class="modal-info-title">Proyectos e <span>Instalaciones</span></div>
      </div>
      <p>Ejecutamos proyectos integrales de construcción e instalación con personal técnico certificado y los mejores materiales del mercado.</p>
      <ul>
        <li>Diseño y suministro de materiales</li>
        <li>Instalaciones eléctricas e industriales</li>
        <li>Proyectos de seguridad y EPP corporativo</li>
        <li>Supervisión de obra</li>
        <li>Presupuesto sin compromiso</li>
      </ul>
      <button class="modal-info-cta" onclick="abrirModal('cotizacion')">Solicitar presupuesto →</button>
    </div>`,

  'srv-asesoria': () => `
    <div class="modal-info">
      <div class="modal-info-header">
        <div class="modal-info-icon">📊</div>
        <div class="modal-info-title">Asesoría <span>Técnica</span></div>
      </div>
      <p>Nuestros especialistas con más de 10 años de experiencia te ayudan a elegir la herramienta correcta para cada trabajo, sin costo adicional.</p>
      <ul>
        <li>Asesoría personalizada en tienda o por WhatsApp</li>
        <li>Comparativa de productos y marcas</li>
        <li>Recomendaciones según presupuesto y uso</li>
        <li>Capacitación en uso seguro de equipos</li>
      </ul>
      <button class="modal-info-cta" onclick="window.open('https://wa.me/51991234567','_blank')">
        <i class="fab fa-whatsapp"></i> Chatear ahora →
      </button>
    </div>`,

  'sector-construccion': () => sectorModal('🏗️','Construcción','Soluciones completas para contratistas y empresas constructoras.', ['Herramientas eléctricas y manuales','Andamios y accesorios','Materiales de fijación','EPP para obra','Concreto, mortero y aditivos']),
  'sector-mineria':       () => sectorModal('⛏️','Minería','Equipos certificados para ambientes mineros y entornos exigentes.',['Herramientas antiexplosión','EPP nivel ANSI/NIOSH','Iluminación para túneles','Comunicación y señalización','Herramientas de medición certificadas']),
  'sector-industria':     () => sectorModal('🏭','Manufactura','Equipamiento para plantas de producción y mantenimiento industrial.',['Herramientas de precisión','Abrasivos industriales','Equipos neumáticos','Lubricantes y consumibles','Señalización de seguridad']),
  'sector-agricultura':   () => sectorModal('🌾','Agroindustria','Equipos y herramientas para el sector agropecuario y agroindustrial.',['Motobombas y mangueras','Pulverizadores','Herramientas de campo','Generadores','Sistemas de riego']),
  'sector-energia':       () => sectorModal('⚡','Energía','Herramientas y equipos para instaladores y técnicos eléctricos.',['Equipos de medición eléctrica','Herramientas dieléctricas','EPP eléctrico certificado','Cables y conductores','Tableros y protecciones']),
};

function sectorModal(icon, nombre, desc, items) {
  return `
    <div class="modal-info">
      <div class="modal-info-header">
        <div class="modal-info-icon">${icon}</div>
        <div class="modal-info-title">Sector <span>${nombre}</span></div>
      </div>
      <p>${desc}</p>
      <ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>
      <button class="modal-info-cta" onclick="abrirModal('cotizacion')">Solicitar catálogo sectorial →</button>
    </div>`;
}

function abrirModal(tipo) {
  const fn = contenidosModal[tipo];
  if (!fn) return;
  document.getElementById('modalContent').innerHTML = fn();
  document.getElementById('modalOverlay').classList.add('active');
}
function cerrarModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}
function cerrarModalOverlay(e) {
  if (e.target.id === 'modalOverlay') cerrarModal();
}

/* ══════════════════════
   COTIZACIÓN WA
══════════════════════ */
function enviarCotizacion() {
  const inputs = document.querySelectorAll('#modalBox input, #modalBox textarea, #modalBox select');
  const datos = [...inputs].map(i => i.value).filter(Boolean);
  const msg = `¡Hola! Solicito una cotización:\n\n${datos.join(' | ')}\n\n¿Pueden ayudarme?`;
  window.open(`https://wa.me/51991234567?text=${encodeURIComponent(msg)}`, '_blank');
  cerrarModal();
  toast('¡Redirigiendo a WhatsApp! 📲', 'success');
}

function rastrearPedido() {
  const nro = document.getElementById('nroPedido')?.value.trim();
  if (!nro) { toast('Ingresa un número de pedido','info'); return; }
  toast(`Buscando pedido ${nro}… (demo)`, 'info');
}

/* ══════════════════════
   BÚSQUEDA
══════════════════════ */
function initSearch() {
  const input    = document.getElementById('searchInput');
  const dropdown = document.getElementById('searchDropdown');
  if (!input) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { dropdown.classList.remove('active'); return; }

    const resultados = productos.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.marca.toLowerCase().includes(q)  ||
      p.sku.toLowerCase().includes(q)
    ).slice(0, 6);

    if (resultados.length === 0) {
      dropdown.innerHTML = `<div class="search-no-results">No se encontraron resultados para "<strong>${q}</strong>"</div>`;
    } else {
      dropdown.innerHTML = resultados.map(p => `
        <div class="search-result-item" onclick="cerrarBusqueda();abrirProducto(${p.id})">
          <div class="sri-icon">${p.icono}</div>
          <div class="sri-info">
            <div class="sri-name">${resaltarTexto(p.nombre, q)}</div>
            <div class="sri-meta">${p.marca} · ${p.sku}</div>
          </div>
          <div class="sri-price">S/ ${p.precio.toFixed(2)}</div>
        </div>
      `).join('');
    }
    dropdown.classList.add('active');
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') cerrarBusqueda();
    if (e.key === 'Enter') buscar();
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-bar')) cerrarBusqueda();
  });
}

function buscar() {
  const q = document.getElementById('searchInput')?.value.trim().toLowerCase();
  if (!q) return;
  cerrarBusqueda();
  // Filtra en la grid principal
  navActual = 'todos';
  tabActual = 'todos';
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector('.nav-item')?.classList.add('active');

  const grid = document.getElementById('productosGrid');
  const lista = productos.filter(p =>
    p.nombre.toLowerCase().includes(q) ||
    p.marca.toLowerCase().includes(q)
  );

  if (lista.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:#555"><div style="font-size:48px">🔍</div><br>No se encontraron productos para "<strong>${q}</strong>"</div>`;
  } else {
    grid.innerHTML = lista.map((p, i) => {
      const esFav  = favoritos.includes(p.id);
      const enCart = carrito.find(c => c.id === p.id);
      const antesHTML = p.precioAntes ? `<div class="precio-antes">S/ ${p.precioAntes.toFixed(2)}</div>` : '';
      return `
        <div class="producto-card" style="animation-delay:${i*0.05}s">
          <div class="prod-img" onclick="abrirProducto(${p.id})">
            <button class="prod-fav ${esFav ? 'active' : ''}" onclick="toggleFav(event,${p.id})"><i class="fas fa-heart"></i></button>
            ${p.icono}
            <div class="prod-quickview">👁 Ver detalle</div>
          </div>
          <div class="prod-info">
            <div class="prod-marca">${p.marca}</div>
            <div class="prod-nombre">${p.nombre}</div>
            <div class="prod-sku">${p.sku}</div>
            <div class="prod-precio">
              <div>${antesHTML}<div class="precio-valor"><span class="precio-moneda">S/</span>${p.precio.toFixed(2)}</div></div>
              <button class="btn-carrito ${enCart ? 'added' : ''}" onclick="agregarCarrito(${p.id})">${enCart ? '✓ Agregado' : '+ Carrito'}</button>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
  toast(`${lista.length} resultado(s) para "${q}"`, 'info');
}

function cerrarBusqueda() {
  document.getElementById('searchDropdown')?.classList.remove('active');
}

function resaltarTexto(texto, q) {
  const regex = new RegExp(`(${q})`, 'gi');
  return texto.replace(regex, '<strong style="color:var(--rojo)">$1</strong>');
}

/* ══════════════════════
   NEWSLETTER
══════════════════════ */
function suscribir() {
  const email = document.getElementById('newsletterEmail');
  if (!email) return;
  const val = email.value.trim();
  if (!val || !val.includes('@')) {
    toast('Ingresa un correo válido', 'info');
    return;
  }
  email.value = '';
  toast('¡Suscripción exitosa! 🎉 Recibirás nuestras novedades.', 'success');
}

/* ══════════════════════
   HEADER SCROLL
══════════════════════ */
function initHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 80);
  });
}

/* ══════════════════════
   STATS COUNTER ANIMATION
══════════════════════ */
function animarStats() {
  const nums = document.querySelectorAll('.stat-num[data-target]');
  if (!nums.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      let current  = 0;
      const step   = Math.ceil(target / 60);
      const timer  = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current.toLocaleString('es-PE') + suffix;
        if (current >= target) clearInterval(timer);
      }, 20);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  nums.forEach(n => observer.observe(n));
}

/* ══════════════════════
   TOAST
══════════════════════ */
function toast(msg, tipo = 'default') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast ${tipo} show`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3200);
}
