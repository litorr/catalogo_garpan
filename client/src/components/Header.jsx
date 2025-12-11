import React, { useState } from 'react';

const Header = ({ isWholesale, onModeChange, userName, cartCount, onOpenCart}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Función para alternar el menú en móvil
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header>
      <div className="logo">
        <a href="/">
          {/* Asegúrate de que logo.png esté en la carpeta public de React */}
          <img src="/logo.png" alt="Logo GARPAN" />
        </a>
      </div>

      <nav>
        {/* Botón Hamburger para móvil */}
        <div 
          className="hamburger" 
          onClick={toggleMenu}
          style={{ display: window.innerWidth <= 768 ? 'flex' : 'none' }}
        >
          <span></span><span></span><span></span>
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="controls-container">

            {/* Selector de Modo */}

            <div className="modo-selector">
              <button 
                className={`modo-btn ${!isWholesale ? 'active' : ''}`} 
                onClick={() => onModeChange('detal')}
              >
                Al Detal
              </button>

              <button 
                className={`modo-btn ${isWholesale ? 'active' : ''}`} 
                onClick={() => onModeChange('mayor')}
              >
                Al Mayor
              </button>

            </div>

            {/* Icono de Carrito (Placeholder para futura lógica) */}
            <div className="cart-icon-container" onClick={onOpenCart}>
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">{cartCount}</span>
            </div>
          </div>

          {/* Enlaces de Navegación */}
          <ul className="nav-links">
            <li 
              className="dropdown" 
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="nav-btn dropdown-toggle">
                Categorías <i className="fas fa-chevron-down"></i>
              </button>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  {['Todos', 'Repostería', 'Confitería', 'Helados', 'Misceláneos'].map((cat) => (
                    <button key={cat} className="dropdown-item">
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </li>
            
            <li><button className="nav-btn">Más Vendidos</button></li>
            <li><button className="nav-btn">Contacto</button></li>
          </ul>

          {/* Mensaje de bienvenida si es mayorista */}
          {isWholesale && userName && (
            <div style={{ marginLeft: '1rem', color: '#1f67c5', fontWeight: 'bold', fontSize: '0.9rem' }}>
              <i className="fas fa-user-check"></i> {userName}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;