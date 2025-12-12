import React, { useState } from 'react';
import '../styles/Contact.css';
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, message } = formData;
    
    if (!name || !message) return alert('Por favor completa todos los campos');

    const whatsappMsg = `Hola, soy ${name}. ${message}`;
    const phoneNumber = "584141914478"; // Tu número real
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
    
    // Limpiar formulario opcional
    setFormData({ name: '', message: '' });
  };

  return (
    <section id="contacto">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1f67c5' }}>Contacto WhatsApp</h2>
      
      <div className="contact-content">
        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '400px' }}>
          <input 
            type="text" 
            id="name" 
            placeholder="Tu Nombre" 
            value={formData.name}
            onChange={handleChange}
            required 
            style={{ marginBottom: '1rem', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}
          />
          <textarea 
            id="message" 
            placeholder="Tu Mensaje" 
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            style={{ marginBottom: '1rem', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', resize: 'none' }}
          ></textarea>
          
          <button 
            type="submit" 
            style={{ 
                background: '#25D366', color: 'white', padding: '0.8rem', 
                border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' 
            }}
          >
            Enviar Mensaje por WhatsApp
          </button>
        </form>

        {/* Tarjeta de Información */}
        <div className="company-info-card">
            <h3 style={{color: '#333', marginBottom: '1rem'}}>Información de GARPAN</h3>
            <p><strong>Ubicación:</strong><br/>Avenida Principal, Local #123</p>
            <p style={{margin: '10px 0'}}><strong>Horario:</strong><br/>Lunes a Viernes: 8:00 AM - 5:00 PM</p>
            <p><strong>Teléfono:</strong><br/>+58 414-1914478</p>
            <p style={{margin: '10px 0'}}><strong>Email:</strong><br/>info@garpan.com</p>
            <p style={{fontStyle: 'italic', marginTop: '1rem', color: '#666'}}>¡Calidad y servicio garantizado!</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;