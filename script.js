const products = [
    // REPOSTERIA
    { id: 1, title: 'ABRILLANTADOR FRESA', description: '1X12X1KG', price: '$7.96', image: 'productos/3.png', categoria: 'reposteria' },
    { id: 2, title: 'MEZCLA PARA BIZCOCHO', description: '5KG', price: '$18.50', image: 'productos/2.png', categoria: 'reposteria' },
    { id: 3, title: 'CHOCOLATE FONDANT', description: '1KG', price: '$12.30', image: 'productos/3.png', categoria: 'reposteria' },
    { id: 4, title: 'COLORANTE GEL ROJO', description: '30ML', price: '$3.20', image: 'productos/2.png', categoria: 'reposteria' },
    { id: 5, title: 'ESENCIA DE VAINILLA', description: '100ML', price: '$2.80', image: 'productos/3.png', categoria: 'reposteria' },
    { id: 6, title: 'MASA DE GOMA', description: '500G', price: '$6.50', image: 'productos/2.png', categoria: 'reposteria' },
    { id: 7, title: 'GLUCOSA LIQUIDA', description: '1KG', price: '$5.40', image: 'productos/3.png', categoria: 'reposteria' },
    { id: 8, title: 'POLVO DE HORNEAR', description: '100G', price: '$1.10', image: 'productos/2.png', categoria: 'reposteria' },
    { id: 9, title: 'AZÚCAR GLAS', description: '1KG', price: '$2.00', image: 'productos/3.png', categoria: 'reposteria' },
    { id: 10, title: 'MANTECA VEGETAL', description: '500G', price: '$4.20', image: 'productos/2.png', categoria: 'reposteria' },

    // CONFITERIA
    { id: 11, title: 'DANDY BUL', description: '12X18UND', price: '$89.50', image: 'productos/1.png', categoria: 'confiteria' },
    { id: 12, title: 'CARAMELO BANANO', description: '1KG', price: '$5.60', image: 'productos/1.png', categoria: 'confiteria' },
    { id: 13, title: 'CHICLE ADAMS', description: '12X10UND', price: '$45.00', image: 'productos/1.png', categoria: 'confiteria' },
    { id: 14, title: 'PASTILLAS EUCALIPTO', description: '200UND', price: '$3.80', image: 'productos/1.png', categoria: 'confiteria' },
    { id: 15, title: 'GOMITAS OSITO', description: '500G', price: '$4.50', image: 'productos/1.png', categoria: 'confiteria' },
    { id: 16, title: 'CARAMELO LECHE', description: '1KG', price: '$5.90', image: 'productos/1.png', categoria: 'confiteria' },
    { id: 17, title: 'CHICLE HUBBA', description: '24UND', price: '$28.00', image: 'productos/1.png', categoria: 'confiteria' },
    { id: 18, title: 'PIRULIN', description: '12UND', price: '$22.00', image: 'productos/1.png', categoria: 'confiteria' },
    { id: 19, title: 'CARAMELO FRUTA', description: '1KG', price: '$5.20', image: 'productos/1.png', categoria: 'confiteria' },
    { id: 20, title: 'CHOCOLATE BARRA', description: '24UND', price: '$67.00', image: 'productos/1.png', categoria: 'confiteria' },

    // HELADOS
    { id: 21, title: 'BASE HELADO VAINILLA', description: '5KG', price: '$95.00', image: 'productos/2.png', categoria: 'helados' },
    { id: 22, title: 'BASE HELADO CHOCOLATE', description: '5KG', price: '$98.00', image: 'productos/2.png', categoria: 'helados' },
    { id: 23, title: 'GELATINA FRESA', description: '1KG', price: '$12.00', image: 'productos/2.png', categoria: 'helados' },
    { id: 24, title: 'GELATINA LIMON', description: '1KG', price: '$12.00', image: 'productos/2.png', categoria: 'helados' },
    { id: 25, title: 'BASE HELADO MANGO', description: '5KG', price: '$99.00', image: 'productos/2.png', categoria: 'helados' },
    { id: 26, title: 'GELATINA UVA', description: '1KG', price: '$12.00', image: 'productos/2.png', categoria: 'helados' },
    { id: 27, title: 'BASE HELADO COCO', description: '5KG', price: '$97.00', image: 'productos/2.png', categoria: 'helados' },
    { id: 28, title: 'GELATINA NARANJA', description: '1KG', price: '$12.00', image: 'productos/2.png', categoria: 'helados' },
    { id: 29, title: 'BASE HELADO FRESA', description: '5KG', price: '$96.00', image: 'productos/2.png', categoria: 'helados' },
    { id: 30, title: 'GELATINA PIÑA', description: '1KG', price: '$12.00', image: 'productos/2.png', categoria: 'helados' },

    // MISCELANEOS
    { id: 31, title: 'ACEITE COPOSA', description: '12UX850ML', price: '$38.50', image: 'productos/2.png', categoria: 'miscelaneos', promo: 'A partir de 500 cajas: 2% adicional' },
    { id: 32, title: 'SAL REFINADA', description: '1KG', price: '$1.80', image: 'productos/2.png', categoria: 'miscelaneos' },
    { id: 33, title: 'AZÚCAR REFINADA', description: '1KG', price: '$2.20', image: 'productos/2.png', categoria: 'miscelaneos' },
    { id: 34, title: 'VINAGRE BLANCO', description: '1L', price: '$2.50', image: 'productos/2.png', categoria: 'miscelaneos' },
    { id: 35, title: 'HARINA DE TRIGO', description: '1KG', price: '$2.00', image: 'productos/2.png', categoria: 'miscelaneos' },
    { id: 36, title: 'LEVADURA SECA', description: '100G', price: '$3.00', image: 'productos/2.png', categoria: 'miscelaneos' },
    { id: 37, title: 'MAICENA', description: '500G', price: '$2.80', image: 'productos/2.png', categoria: 'miscelaneos' },
    { id: 38, title: 'BICARBONATO', description: '100G', price: '$1.20', image: 'productos/2.png', categoria: 'miscelaneos' },
    { id: 39, title: 'CREMA DE TARTARO', description: '50G', price: '$4.50', image: 'productos/2.png', categoria: 'miscelaneos' },
    { id: 40, title: 'AGUA OXIGENADA', description: '100ML', price: '$3.00', image: 'productos/2.png', categoria: 'miscelaneos' },

    // PLASTICOS
    { id: 41, title: 'BOLSA PLASTICA CHICA', description: '100UND', price: '$3.00', image: 'productos/1.png', categoria: 'plasticos' },
    { id: 42, title: 'BOLSA PLASTICA MEDIANA', description: '100UND', price: '$4.50', image: 'productos/1.png', categoria: 'plasticos' },
    { id: 43, title: 'BOLSA PLASTICA GRANDE', description: '100UND', price: '$6.00', image: 'productos/1.png', categoria: 'plasticos' },
    { id: 44, title: 'VASO PLASTICO 200ML', description: '50UND', price: '$4.00', image: 'productos/1.png', categoria: 'plasticos' },
    { id: 45, title: 'VASO PLASTICO 300ML', description: '50UND', price: '$5.00', image: 'productos/1.png', categoria: 'plasticos' },
    { id: 46, title: 'PLATO PLASTICO', description: '20UND', price: '$3.50', image: 'productos/1.png', categoria: 'plasticos' },
    { id: 47, title: 'CUCHARITA PLASTICA', description: '50UND', price: '$2.50', image: 'productos/1.png', categoria: 'plasticos' },
    { id: 48, title: 'PALILLO MADERA', description: '100UND', price: '$2.00', image: 'productos/1.png', categoria: 'plasticos' },
    { id: 49, title: 'SERVILLETAS PAPEL', description: '100UND', price: '$3.00', image: 'productos/1.png', categoria: 'plasticos' },
    { id: 50, title: 'TOALLA PAPEL', description: '6ROLL', price: '$8.00', image: 'productos/1.png', categoria: 'plasticos' },

    // FRUTOS SECOS
    { id: 51, title: 'ALMENDRA LAMINADA', description: '500G', price: '$18.00', image: 'productos/3.png', categoria: 'frutos' },
    { id: 52, title: 'NUEZ MOSCADA', description: '100G', price: '$12.00', image: 'productos/3.png', categoria: 'frutos' },
    { id: 53, title: 'PISTACHO SIN SAL', description: '250G', price: '$22.00', image: 'productos/3.png', categoria: 'frutos' },
    { id: 54, title: 'AVELLANA ENTERA', description: '500G', price: '$16.00', image: 'productos/3.png', categoria: 'frutos' },
    { id: 55, title: 'PASAS DE UVA', description: '1KG', price: '$6.50', image: 'productos/3.png', categoria: 'frutos' },
    { id: 56, title: 'ARANDANO SECO', description: '250G', price: '$14.00', image: 'productos/3.png', categoria: 'frutos' },
    { id: 57, title: 'COCO RALLADO', description: '250G', price: '$4.50', image: 'productos/3.png', categoria: 'frutos' },
    { id: 58, title: 'MANI CON SAL', description: '500G', price: '$5.00', image: 'productos/3.png', categoria: 'frutos' },
    { id: 59, title: 'SEMILLA GIRASOL', description: '300G', price: '$4.00', image: 'productos/3.png', categoria: 'frutos' },
    { id: 60, title: 'NUEZ PECAN', description: '250G', price: '$20.00', image: 'productos/3.png', categoria: 'frutos' },

    // ESENCIAS
    { id: 61, title: 'ESENCIA VAINILLA', description: '100ML', price: '$2.80', image: 'productos/3.png', categoria: 'esencias' },
    { id: 62, title: 'ESENCIA ALMENDRA', description: '50ML', price: '$3.50', image: 'productos/3.png', categoria: 'esencias' },
    { id: 63, title: 'ESENCIA LIMON', description: '50ML', price: '$2.50', image: 'productos/3.png', categoria: 'esencias' },
    { id: 64, title: 'ESENCIA NARANJA', description: '50ML', price: '$2.50', image: 'productos/3.png', categoria: 'esencias' },
    { id: 65, title: 'ESENCIA ANIS', description: '50ML', price: '$2.80', image: 'productos/3.png', categoria: 'esencias' },
    { id: 66, title: 'ESENCIA COCO', description: '50ML', price: '$2.60', image: 'productos/3.png', categoria: 'esencias' },
    { id: 67, title: 'ESENCIA CAFE', description: '50ML', price: '$3.00', image: 'productos/3.png', categoria: 'esencias' },
    { id: 68, title: 'ESENCIA FRESA', description: '50ML', price: '$2.60', image: 'productos/3.png', categoria: 'esencias' },
    { id: 69, title: 'ESENCIA MENTA', description: '50ML', price: '$2.50', image: 'productos/3.png', categoria: 'esencias' },
    { id: 70, title: 'COLORANTE LIQUIDO ROJO', description: '30ML', price: '$3.20', image: 'productos/3.png', categoria: 'esencias' },

    // BEBIDAS
    { id: 71, title: 'JUGO DE NARANJA', description: '1LT', price: '$2.50', image: 'productos/1.png', categoria: 'bebidas' },
    { id: 72, title: 'JUGO DE MANZANA', description: '1LT', price: '$2.50', image: 'productos/1.png', categoria: 'bebidas' },
    { id: 73, title: 'JUGO DE UVA', description: '1LT', price: '$2.50', image: 'productos/1.png', categoria: 'bebidas' },
    { id: 74, title: 'BEBIDA ENERGIZANTE', description: '250ML', price: '$2.00', image: 'productos/1.png', categoria: 'bebidas' },
    { id: 75, title: 'AGUA MINERAL', description: '600ML', price: '$1.50', image: 'productos/1.png', categoria: 'bebidas' },
    { id: 76, title: 'GASEOSA COLA', description: '1.5LT', price: '$2.80', image: 'productos/1.png', categoria: 'bebidas' },
    { id: 77, title: 'GASEOSA NARANJA', description: '1.5LT', price: '$2.80', image: 'productos/1.png', categoria: 'bebidas' },
    { id: 78, title: 'JUGO DE PIÑA', description: '1LT', price: '$2.50', image: 'productos/1.png', categoria: 'bebidas' },
    { id: 79, title: 'TE HELADO LIMON', description: '500ML', price: '$2.00', image: 'productos/1.png', categoria: 'bebidas' },
    { id: 80, title: 'BEBIDA ISOTONICA', description: '500ML', price: '$2.20', image: 'productos/1.png', categoria: 'bebidas' },
];

const bestsellers = products.slice(0, 6);

function generateCards(containerId, productList) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    productList.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3 class="product-title">${p.title}</h3>
            <img src="${p.image}" alt="${p.title}">
            <div class="product-info">
                <p class="product-desc">${p.description}</p>
                <p class="product-price">${p.price}</p>
                ${p.promo ? `<p class="product-promo">${p.promo}</p>` : ''}
                <button onclick="buyProduct(${p.id})">Comprar por WhatsApp</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterCategory(categoria) {
    const filtrados = categoria === 'todos' ? products : products.filter(p => p.categoria === categoria);
    const titulo = categoria === 'todos' ? 'Todos los Productos' : `Productos de ${categoria.replace(/^\w/, c => c.toUpperCase())}`;
    document.getElementById('titulo-filtro').textContent = titulo;
    generateCards('products-grid', filtrados);
    document.getElementById('todos-los-productos').scrollIntoView({ behavior: 'smooth' });
}

function buyProduct(id) {
    const p = products.find(x => x.id === id);
    const msg = `Hola, quiero ${p.title} - ${p.description} - ${p.price}`;
    window.open(`https://wa.me/584141914478?text=${encodeURIComponent(msg)}`, '_blank');
}

function sendContactMessage() {
    const name = document.getElementById('contact-name').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    if (!name || !message) return alert('Completa todos los campos');
    const msg = `Hola, soy ${name}. ${message}`;
    window.open(`https://wa.me/584141914478?text=${encodeURIComponent(msg)}`, '_blank');
}

// Menú hamburguesa
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));

// Cargar todos al inicio
window.addEventListener('DOMContentLoaded', () => {
    generateCards('products-grid', products);
    generateCards('bestsellers-grid', bestsellers);
});


let modo = 'detal'; // 'detal' o 'mayor'

function setModo(nuevoModo) {
    modo = nuevoModo;
    document.getElementById('btn-detal').classList.toggle('active', modo === 'detal');
    document.getElementById('btn-mayor').classList.toggle('active', modo === 'mayor');
    // Aquí puedes aplicar lógica para cambiar precios si tienes dos listas
    filterCategory('todos'); // Recarga con el modo activo
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Buscador
const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    const filtrados = products.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
    generateCards('products-grid', filtrados);
    document.getElementById('titulo-filtro').textContent = 'Resultados de búsqueda';
});

// Toggle modo
function toggleModo() {
    const esMayor = document.getElementById('modo-toggle').checked;
    // Aquí puedes cambiar lógica de precios si tienes dos listas
    console.log(esMayor ? 'Modo: Al Mayor' : 'Modo: Al Detal');
    filterCategory('todos'); // Recarga con modo activo
}