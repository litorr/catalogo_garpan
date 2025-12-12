import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Contact from './components/Contact';
import CartModal from './components/CartModal';
import AccessModal from './components/AccessModal';
import API_URL from './config'; // Importante: URL dinámica
import './App.css';

function App() {
  // --- ESTADOS ---
  const [products, setProducts] = useState([]); // Productos de la BD
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [category, setCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isWholesale, setIsWholesale] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [wholesalerName, setWholesalerName] = useState('');

  // --- 1. CARGAR PRODUCTOS DESDE LA API ---
  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error cargando productos:", err));
  }, []);

  // --- 2. LÓGICA DE FILTRADO (LO QUE FALTABA) ---
  const filteredProducts = products.filter((product) => {
    // 1. Filtro por Categoría
    const matchesCategory = category === 'Todos' || product.categoria === category;
    
    // 2. Filtro por Buscador (Texto)
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // (Opcional) Productos Destacados / Más Vendidos (usamos los primeros 4 por defecto)
  const bestSellers = products.slice(0, 4);

  // --- 3. FUNCIONES DEL CARRITO ---
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id || item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          (item.id === product.id || item._id === product._id) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      // Aseguramos que tenga un ID único (MongoDB usa _id, React prefiere id)
      return [...prevCart, { ...product, id: product._id || product.id, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, change) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // --- 4. RENDERIZADO ---
  return (
    <div className="App">
      <Header 
        isWholesale={isWholesale}
        onModeChange={(mode) => {
          if (mode === 'mayor' && !isWholesale) setIsAccessModalOpen(true);
          if (mode === 'detal') {
            setIsWholesale(false);
            setWholesalerName('');
          }
        }}
        userName={wholesalerName}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onCategorySelect={setCategory}
        onScrollTo={(id) => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <Hero 
        onSearch={setSearchTerm} 
        category={category}
      />

      {/* SECCIÓN PRINCIPAL DE PRODUCTOS (Filtrados) */}
      <ProductGrid 
        products={filteredProducts} // <--- AQUÍ SE USA LA VARIABLE
        isWholesale={isWholesale} 
        onAddToCart={addToCart}
        sectionId="catalogo"
        title={category === 'Todos' ? 'Catálogo Completo' : `Categoría: ${category}`}
      />

      {/* SECCIÓN MÁS VENDIDOS (Solo si no estamos buscando) */}
      {category === 'Todos' && !searchTerm && (
        <ProductGrid 
          sectionId="mas-vendidos"
          title="Productos Más Vendidos"
          products={bestSellers} 
          isWholesale={isWholesale} 
          onAddToCart={addToCart} 
        />
      )}

      <Contact />

      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onClearCart={clearCart}
      />

      <AccessModal 
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
        onVerified={() => {
          setIsWholesale(true);
          setWholesalerName('Cliente Mayorista');
          alert("¡Código aceptado! Precios de mayorista activados.");
        }}
      />
    </div>
  );
}

export default App;