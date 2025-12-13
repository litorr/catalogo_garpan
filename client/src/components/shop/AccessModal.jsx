import React, { useState } from 'react';
import API_URL from '../config'; // Importamos la configuración para que funcione en Vercel
import '../styles/AccessModal.css'; // Importamos los estilos

const AccessModal = ({ isOpen, onClose, onVerified }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleValidate = async () => {
    if (!code) return setError('Por favor ingresa el código');
    setLoading(true);
    setError('');

    try {
      // Usamos API_URL en lugar de localhost
      const res = await fetch(`${API_URL}/api/validate-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo: code })
      });
      
      const data = await res.json();

      if (data.success) {
        onVerified(); // Avisamos a App.jsx que todo está bien
        onClose();    // Cerramos modal
        setCode('');  // Limpiamos campo
      } else {
        setError('Código incorrecto. Intenta nuevamente.');
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión con el servidor.');
    }
    setLoading(false);
  };

  const handleRequestCode = () => {
    const phone = "584141914478"; 
    const text = "Hola Garpan, soy un cliente mayorista y quisiera solicitar el código de acceso para ver los precios especiales. Mis datos son:";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="mayorista-modal active">
      <div className="mayorista-content">
        <span className="close-mayorista" onClick={onClose}>&times;</span>
        
        <div style={{marginBottom: '1.5rem'}}>
            <i className="fas fa-lock" style={{fontSize: '3rem', color: '#1f67c5'}}></i>
        </div>

        <h2>Acceso Mayorista</h2>
        <p style={{color: '#666', marginBottom: '1.5rem'}}>
            Ingresa tu código de acceso para desbloquear los precios al mayor.
        </p>
        
        <div className="form-group">
            <input 
              type="text" 
              placeholder="CÓDIGO (Ej: GARPAN2025)" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="seniat-input"
              onKeyPress={(e) => e.key === 'Enter' && handleValidate()}
              style={{textAlign: 'center', fontSize: '1.2rem', letterSpacing: '2px', textTransform: 'uppercase'}}
            />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="mayorista-buttons" style={{flexDirection: 'column'}}>
          <button onClick={handleValidate} disabled={loading}>
            {loading ? 'Validando...' : 'Ingresar'}
          </button>
          
          <div style={{margin: '1rem 0', color: '#aaa', fontSize: '0.9rem'}}>¿No tienes el código?</div>
          
          <button 
            onClick={handleRequestCode} 
            className="cancel-btn"
            style={{background: '#25D366', color: 'white', border: 'none'}}
          >
            <i className="fab fa-whatsapp"></i> Solicitar código por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessModal;