import React, { useState, useEffect } from 'react';
import '../App.css'; // Usar estilos del modal original refactorizados

const SeniatModal = ({ isOpen, onClose, onVerified }) => {
  const [step, setStep] = useState(1); // 1: Cargar, 2: Formulario, 3: Éxito
  const [captchaImg, setCaptchaImg] = useState('');
  const [rif, setRif] = useState('');
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [empresa, setEmpresa] = useState('');

  // Cargar captcha cuando se abre el modal
  useEffect(() => {
    if (isOpen) fetchCaptcha();
  }, [isOpen]);

  const fetchCaptcha = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3001/api/seniat/captcha');
      const data = await res.json();
      if (data.success) {
        setCaptchaImg(data.image);
        setStep(2);
      } else {
        setError('Error cargando Captcha');
      }
    } catch (e) {
      setError('Error de conexión');
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    if (!rif || !codigo) return setError('Complete todos los campos');
    setLoading(true);
    
    try {
      const res = await fetch('http://localhost:3001/api/seniat/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rif, codigo })
      });
      const data = await res.json();

      if (data.success) {
        setEmpresa(data.nombre);
        setStep(3); // Mostrar pantalla de éxito
        // Esperar 2 segundos y cerrar
        setTimeout(() => {
            onVerified(data.nombre);
            onClose();
        }, 2000);
      } else {
        setError(data.error);
        if (data.error.includes("Captcha")) fetchCaptcha(); // Recargar si falló captcha
      }
    } catch (e) {
      setError('Error validando datos');
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="mayorista-modal active">
      <div className="mayorista-content">
        <span className="close-mayorista" onClick={onClose}>&times;</span>
        
        <h2>Verificación Mayorista (SENIAT)</h2>
        
        {loading && <div className="spinner">Conectando con SENIAT...</div>}

        {step === 2 && !loading && (
          <>
            <p>Ingrese su RIF Jurídico y el código de seguridad:</p>
            
            <div className="form-group">
                <input 
                  type="text" 
                  placeholder="RIF (Ej: J123456789)" 
                  value={rif}
                  onChange={(e) => setRif(e.target.value.toUpperCase())}
                  className="seniat-input"
                />
            </div>

            <div className="captcha-container" style={{display:'flex', gap:'10px', alignItems:'center', margin:'15px 0'}}>
                <img src={captchaImg} alt="Captcha" style={{borderRadius:'5px', border:'1px solid #ccc'}} />
                <button type="button" onClick={fetchCaptcha} style={{background:'none', border:'none', color:'blue', cursor:'pointer'}}>↻</button>
            </div>

            <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Código de la imagen" 
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  className="seniat-input"
                />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="mayorista-buttons">
              <button onClick={handleVerify}>Verificar RIF</button>
              <button onClick={onClose} className="cancel-btn">Cancelar</button>
            </div>
          </>
        )}

        {step === 3 && (
          <div style={{textAlign: 'center', color: 'green'}}>
            <h3>¡Verificado!</h3>
            <p>Bienvenido, {empresa}</p>
            <i className="fas fa-check-circle" style={{fontSize: '3rem', margin: '1rem'}}></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeniatModal;