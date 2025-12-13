import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Hero from './components/common/Hero';
import ProductGrid from './components/ProductGrid';
import Contact from './components/common/Contact';
import CartModal from './components/CartModal';
import AccessModal from './components/AccessModal';
import { getProducts } from './services/productService';
import './App.css';


function App() {
  // --- ESTADOS ---
  const [products, setProducts] = useState([]); 
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [category, setCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isWholesale, setIsWholesale] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [wholesalerName, setWholesalerName] = useState('');

  // --- CARGAR PRODUCTOS (Usando Servicio) ---
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error cargando productos:", err);
      }
    };
    loadData();
  }, []);

  // --- LÓGICA DE FILTRADO ---
  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === 'Todos' || product.categoria === category;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const bestSellers = products.slice(0, 4);

  // --- FUNCIONES DEL CARRITO ---
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => (item.id || item._id) === (product.id || product._id));
      if (existingItem) {
        return prevCart.map((item) =>
          (item.id || item._id) === (product.id || product._id)
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
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

  // --- RENDERIZADO ---
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

      <Hero onSearch={setSearchTerm} category={category} />

      <ProductGrid 
        products={filteredProducts} 
        isWholesale={isWholesale} 
        onAddToCart={addToCart}
        sectionId="catalogo"
        title={category === 'Todos' ? 'Catálogo Completo' : `Categoría: ${category}`}
      />

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