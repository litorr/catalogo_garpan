import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductManager from '../shop/ProductManager.jsx'; 
import { getOrders, updateOrderStatus } from '../services/orderService'; // <--- USANDO SERVICIO

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' o 'products'
  const navigate = useNavigate();

  // Cargar órdenes
  const fetchOrders = async () => {
    try {
      const data = await getOrders(); // Llamada limpia
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

 // Actualizar estado
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await updateOrderStatus(id, newStatus); // Llamada limpia
      if (res.success) {
        setOrders(prev => prev.map(o => o._id === id ? { ...o, status: newStatus } : o));
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* HEADER */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem'}}>
        <h1 style={{ color: '#1f67c5' }}>Panel de Administración</h1>
        <div style={{display:'flex', gap:'10px'}}>
            <a href="/" target="_blank" style={{padding:'10px 15px', background:'#eee', borderRadius:'5px', textDecoration:'none', color:'#333'}}>
                Ver Tienda
            </a>
            <button onClick={handleLogout} style={{padding:'10px 15px', background:'#dc3545', color:'white', border:'none', borderRadius:'5px', cursor:'pointer'}}>
                Salir
            </button>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem', borderBottom: '2px solid #eee' }}>
        <button 
            onClick={() => setActiveTab('orders')}
            style={{
                padding: '10px 20px', 
                background: activeTab === 'orders' ? '#1f67c5' : 'transparent', 
                color: activeTab === 'orders' ? 'white' : '#555',
                border: 'none', borderRadius: '5px 5px 0 0', cursor: 'pointer', fontWeight: 'bold'
            }}
        >
            📦 Pedidos
        </button>
        <button 
            onClick={() => setActiveTab('products')}
            style={{
                padding: '10px 20px', 
                background: activeTab === 'products' ? '#1f67c5' : 'transparent', 
                color: activeTab === 'products' ? 'white' : '#555',
                border: 'none', borderRadius: '5px 5px 0 0', cursor: 'pointer', fontWeight: 'bold'
            }}
        >
            🏷️ Productos
        </button>
      </div>

      {/* CONTENIDO */}
      {activeTab === 'products' && <ProductManager />}

      {activeTab === 'orders' && (
        <div>
            <h2 style={{ marginBottom: '1rem' }}>Órdenes Recientes ({orders.length})</h2>
            {loading ? <p>Cargando...</p> : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                {orders.map(order => (
                    <div key={order._id} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '1.5rem', backgroundColor: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                    <div style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid #eee', paddingBottom:'10px', marginBottom:'10px'}}>
                        <div>
                        <strong style={{fontSize:'1.1rem'}}>{order.customerName}</strong>
                        <div style={{color:'#777', fontSize:'0.9rem'}}>{new Date(order.date).toLocaleString()}</div>
                        </div>
                        <div style={{textAlign:'right'}}>
                        <div style={{fontWeight:'bold', color:'#d97706', fontSize:'1.2rem'}}>${order.total.toFixed(2)}</div>
                        <span style={{ background: '#fff3cd', color: '#856404', padding: '2px 8px', borderRadius:'10px', fontSize:'0.8rem' }}>
                            {order.status.toUpperCase()}
                        </span>
                        </div>
                    </div>
                    <ul style={{listStyle:'none', padding:0}}>
                        {order.items.map((item, idx) => (
                        <li key={idx} style={{display:'flex', justifyContent:'space-between', marginBottom:'5px', fontSize:'0.95rem'}}>
                            <span>{item.quantity}x {item.productTitle}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                        ))}
                    </ul>

                    {/* Botones de Estado */}
                    <div style={{marginTop:'1rem', paddingTop:'10px', borderTop:'1px dashed #eee', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <span style={{fontSize:'0.8rem', color:'#aaa'}}>ID: {order._id}</span>
                        
                        <div style={{display:'flex', gap:'5px'}}>
                            {order.status !== 'pendiente' && (
                                <button onClick={() => handleUpdateStatus(order._id, 'pendiente')} style={{padding:'5px 10px', fontSize:'0.8rem', cursor:'pointer', background:'#fff3cd', border:'1px solid #ffeeba'}}>
                                    Pendiente
                                </button>
                            )}
                            {order.status !== 'completado' && (
                                <button onClick={() => handleUpdateStatus(order._id, 'completado')} style={{padding:'5px 10px', fontSize:'0.8rem', cursor:'pointer', background:'#d4edda', border:'1px solid #c3e6cb', color:'#155724'}}>
                                    Completar
                                </button>
                            )}
                            {order.status !== 'cancelado' && (
                                <button onClick={() => handleUpdateStatus(order._id, 'cancelado')} style={{padding:'5px 10px', fontSize:'0.8rem', cursor:'pointer', background:'#f8d7da', border:'1px solid #f5c6cb', color:'#721c24'}}>
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </div>

                    </div>
                ))}
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;