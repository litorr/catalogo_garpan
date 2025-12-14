import React from 'react'
import ReactDOM from 'react-dom/client'
// CAMBIO 1: Importamos HashRouter en lugar de BrowserRouter
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.jsx'
import AdminDashboard from './components/admin/AdminDashboard.jsx'
import AdminLogin from './components/admin/AdminLogin.jsx'
import './App.css'

const PrivateRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('adminToken');
  // CAMBIO 2 (Opcional pero recomendado): Redirigimos usando rutas relativas o absolutas
  return isAdmin ? children : <Navigate to="/admin" replace />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* CAMBIO 3: Usamos HashRouter aquí */}
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)