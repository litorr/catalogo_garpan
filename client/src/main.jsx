import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import AdminLogin from './components/AdminLogin.jsx' // <--- IMPORTAR
import './App.css'

// Componente para proteger rutas (Middleware simple)
const PrivateRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('adminToken'); // Verificamos si existe la marca
  return isAdmin ? children : <Navigate to="/admin" />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta pública (Catálogo) */}
        <Route path="/" element={<App />} />
        
        {/* Login de Admin */}
        <Route path="/admin" element={<AdminLogin />} />
        
        {/* Ruta Privada (Panel) */}
        <Route 
          path="/admin/dashboard" 
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)