import React from 'react';

const Hero = ({ onSearch }) => {
  return (
    <section id="hero">
      <h1>CATÁLOGO DE GARPAN</h1>
      <p>Descubre nuestros productos</p>
      
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Buscar productos..." 
          onChange={(e) => onSearch(e.target.value)} // Conecta con App.jsx
        />
        <i className="fas fa-search search-icon"></i>
      </div>
    </section>
  );
};

export default Hero;