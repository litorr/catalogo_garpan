import React, { useState } from 'react';
import '../styles/Header.css';
const Header = ({ isWholesale, onModeChange, userName, cartCount, onOpenCart, onCategorySelect, onScrollTo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    { label: 'Todos', value: 'Todos' },
    { label: 'Repostería', value: 'reposteria' },
    { label: 'Confitería', value: 'confiteria' },
    { label: 'Helados', value: 'helados' },
    { label: 'Misceláneos', value: 'miscelaneos' },
    { label: 'Plásticos', value: 'plasticos' },
    { label: 'Frutos Secos', value: 'frutos' },
    { label: 'Esencias', value: 'esencias' },
    { label: 'Bebidas', value: 'bebidas' }
  ];

  const handleCategoryClick = (catValue) => {
    onCategorySelect(catValue);
    setIsMenuOpen(false); // Cerrar menú al seleccionar
    setIsDropdownOpen(false);
  };

  const handleScrollClick = (sectionId) => {
    onScrollTo(sectionId);
    setIsMenuOpen(false); // Cerrar menú al navegar
  };

  return (
    <header>
      <div className="logo">
        <img 
          src="/logo.png" 
          alt="Logo" 
          style={{cursor:'pointer', width: '80px'}} 
          onClick={() => window.location.reload()}
        />
      </div>

      <nav>
        {/* Botón Hamburguesa (El CSS controla su visibilidad) */}
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`} style={{fontSize: '1.5rem'}}></i>
        </div>

        {/* Menú de Navegación */}
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          
          <div className="controls-container">
            <div className="modo-selector">
              <button className={`modo-btn ${!isWholesale ? 'active' : ''}`} onClick={() => onModeChange('detal')}>Al Detal</button>
              <button className={`modo-btn ${isWholesale ? 'active' : ''}`} onClick={() => onModeChange('mayor')}>Al Mayor</button>
            </div>

            <div className="cart-icon-container" onClick={onOpenCart} style={{cursor: 'pointer'}}>
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">{cartCount}</span>
            </div>
          </div>

          <ul className="nav-links">
            <li 
              className="dropdown"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="nav-btn dropdown-toggle">
                Categorías <i className="fas fa-chevron-down"></i>
              </button>
              
              <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} style={{display: isDropdownOpen ? 'flex' : 'none'}}>
                {categories.map((cat) => (
                  <button key={cat.value} className="dropdown-item" onClick={() => handleCategoryClick(cat.value)}>
                    {cat.label}
                  </button>
                ))}
              </div>
            </li>
            
            <li>
              <button className="nav-btn" onClick={() => handleScrollClick('mas-vendidos')}>
                Más Vendidos
              </button>
            </li>
            <li>
              <button className="nav-btn" onClick={() => handleScrollClick('contacto')}>
                Contacto
              </button>
            </li>
          </ul>

          {isWholesale && userName && (
            <div className="user-welcome" style={{ marginLeft: '10px', color: '#1f67c5', fontSize: '0.8rem', fontWeight: 'bold' }}>
              <i className="fas fa-user-check"></i> {userName}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;