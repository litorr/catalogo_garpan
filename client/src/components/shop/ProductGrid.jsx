import React from 'react';
import '../styles/ProductGrid.css';
import API_URL from '../config';

// Ahora aceptamos 'title' y 'sectionId' como propiedades nuevas
const ProductGrid = ({ products, isWholesale, onAddToCart, title, sectionId }) => {
  
  if (!products || products.length === 0) {
    // Si es la sección principal y no hay productos, mostramos carga. 
    // Si es una sección secundaria (como más vendidos) y no hay datos, mejor no renderizar nada.
    if (sectionId === 'todos-los-productos') {
        return <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando productos...</div>;
    }
    return null; 
  }

  return (
    <section id={sectionId}> {/* ID dinámico para el scroll */}
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1f67c5' }}>
        {title || (isWholesale ? 'Precios al Mayor' : 'Todos los Productos')}
      </h2>
      
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3 className="product-title">{product.title}</h3>
            
            <img 
              src={
                product.image && product.image.startsWith('uploads') 
                  ? `${API_URL}/${product.image}` // Imagen subida (Backend)
                  : `/${product.image}` // Imagen local (Frontend/Public)
              } 
              alt={product.title} 
              onError={(e) => { e.target.src = 'https://via.placeholder.com/200'; }}
            />
                        
            <div className="product-info">
              <p className="product-desc">{product.description}</p>
              
              <p 
                className="product-price" 
                style={{ color: isWholesale ? '#28a745' : '#d97706' }}
              >
                {product.price} 
                {isWholesale && <span style={{fontSize:'0.8rem', color:'#333'}}> (Mayor)</span>}
              </p>
              
              {product.promo && <p className="product-promo">{product.promo}</p>}
              
              <button 
                className="add-btn"
                onClick={() => onAddToCart(product)}
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;