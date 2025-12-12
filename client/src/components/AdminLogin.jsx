import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();

      if (data.success) {
        // Guardamos una "marca" en el navegador para saber que está logueado
        localStorage.setItem('adminToken', data.token); 
        navigate('/admin/dashboard'); // Redirigir al panel
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f4' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', width: '350px' }}>
        <h2 style={{ textAlign: 'center', color: '#1f67c5', marginBottom: '1.5rem' }}>Acceso Admin</h2>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Usuario</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '5px' }}
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '5px' }}
            />
          </div>

          {error && <p style={{ color: 'red', fontSize: '0.9rem', marginBottom: '1rem' }}>{error}</p>}

          <button type="submit" style={{ width: '100%', padding: '0.7rem', background: '#1f67c5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Entrar
          </button>
        </form>
        
        <div style={{textAlign: 'center', marginTop: '1rem'}}>
            <a href="/" style={{color: '#666', fontSize: '0.9rem'}}>Volver al Catálogo</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;