import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartModal from './components/CartModal';
import Contact from './components/Contact'; // <--- Importamos Contacto
import './App.css';

function App() {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Variables para lógica de "Más Vendidos"
  const [bestSellers, setBestSellers] = useState([]);

  // Estados de control
  const [category, setCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isWholesale, setIsWholesale] = useState(false);
  const [isSeniatOpen, setIsSeniatOpen] = useState(false);
  const [wholesalerName, setWholesalerName] = useState('');
  
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 1. Cargar productos
  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        // Lógica simple para "Más vendidos": Tomamos los primeros 6
        setBestSellers(data.slice(0, 6)); 
      })
      .catch(err => console.error("Error cargando productos:", err));
  }, []);

  // 2. Filtrado (igual que antes)
  useEffect(() => {
    let result = products;
    if (category !== 'Todos') {
      result = result.filter(p => p.categoria && p.categoria.toLowerCase() === category.toLowerCase());
    }
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(lowerTerm) || 
        (p.description && p.description.toLowerCase().includes(lowerTerm))
      );
    }
    setFilteredProducts(result);
  }, [category, searchTerm, products]);

  // --- HANDLERS (igual que antes) ---
  const handleSearch = (term) => setSearchTerm(term);
  
  const handleCategorySelect = (cat) => {
    setCategory(cat);
    document.getElementById('todos-los-productos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollTo = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // setIsCartOpen(true); // Comentado para no abrir el carrito cada vez
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  
  const updateQuantity = (id, change) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean));
  };

  const handleModeChange = (mode) => {
    if (mode === 'mayor' && !isWholesale) setIsSeniatOpen(true);
    else if (mode === 'detal') {
      setIsWholesale(false);
      setWholesalerName('');
    }
  };

  return (
    <div className="App">
      <Header 
        isWholesale={isWholesale} 
        onModeChange={handleModeChange} 
        userName={wholesalerName}
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onCategorySelect={handleCategorySelect}
        onScrollTo={handleScrollTo}
      />
      
      <Hero onSearch={handleSearch} />
      
      <main>
        {/* SECCIÓN 1: TODOS LOS PRODUCTOS */}
        <ProductGrid 
          sectionId="todos-los-productos"
          title={isWholesale ? 'Catálogo al Mayor' : 'Todos los Productos'}
          products={filteredProducts}
          isWholesale={isWholesale} 
          onAddToCart={addToCart} 
        />

        {/* SECCIÓN 2: MÁS VENDIDOS (Reutilizamos ProductGrid) */}
        <ProductGrid 
          sectionId="mas-vendidos"
          title="Productos Más Vendidos"
          products={bestSellers} 
          isWholesale={isWholesale} 
          onAddToCart={addToCart} 
        />
      </main>

      {/* SECCIÓN 3: CONTACTO */}
      <Contact />

      <footer style={{textAlign: 'center', padding: '1rem', color: '#777', borderTop: '1px solid #eee'}}>
        <p>&copy; 2025 GARPAN. Todos los derechos reservados.</p>
      </footer>

      {/* Modales */}
      <SeniatModal 
        isOpen={isSeniatOpen} 
        onClose={() => setIsSeniatOpen(false)}
        onVerified={(nombre) => {
          setIsWholesale(true);
          setWholesalerName(nombre);
        }}
      />

      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
}

export default App;