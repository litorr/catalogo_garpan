import React, { useState } from 'react';
import '../styles/CartModal.css';
import API_URL from '../config';

const CartModal = ({ isOpen, onClose, cartItems, onRemove, onUpdateQuantity, onClearCart }) => {
  const [clientName, setClientName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Calcular total
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', '')); 
    return sum + (price * item.quantity);
  }, 0);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return alert('Tu carrito está vacío');
    if (!clientName.trim()) return alert('Por favor ingresa tu nombre para procesar el pedido.');

    setLoading(true);

    const orderData = {
      customerName: clientName,
      total: total,
      items: cartItems.map(item => ({
        productTitle: item.title,
        quantity: item.quantity,
        price: parseFloat(item.price.replace('$', ''))
      }))
    };

    try {
      const response = await fetch('${API_URL}/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      
      const data = await response.json();

      if (data.success) {
        let message = `Hola, soy *${clientName}*.\n`;
        message += `Deseo confirmar mi pedido Web *#${data.orderId.slice(-6)}*:\n\n`;
        
        cartItems.forEach(item => {
            const price = parseFloat(item.price.replace('$', ''));
            const itemTotal = price * item.quantity;
            message += `▪ ${item.quantity}x ${item.title} - $${itemTotal.toFixed(2)}\n`;
        });

        message += `\n*TOTAL A PAGAR: $${total.toFixed(2)}*`;
        
        const phoneNumber = "584141914478"; 
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
        
        onClearCart();
        setClientName('');
        onClose();
      } else {
        alert('Hubo un error guardando tu pedido.');
      }

    } catch (error) {
      console.error("Error checkout:", error);
      alert('Error de conexión con el servidor.');
    }
    
    setLoading(false);
  };

  return (
    <div className="cart-modal active">
      <div className="cart-content">
        <span className="close-cart" onClick={onClose}>&times;</span>
        <h2 style={{color: '#1f67c5', marginBottom: '1rem'}}>Tu Carrito</h2>
        
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p style={{textAlign:'center', color:'#888', marginTop:'2rem'}}>
              Tu carrito está vacío 😔
            </p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                
                {/* --- CORRECCIÓN AQUÍ: Usamos 'item' en lugar de 'product' --- */}
                <img 
                  src={
                    item.image && item.image.startsWith('uploads') 
                      ? `http://localhost:3001/${item.image}` 
                      : `/${item.image}`
                  } 
                  alt={item.title} 
                  onError={(e) => {e.target.src = 'https://via.placeholder.com/60'}}
                />

                <div className="cart-item-details">
                  <div className="cart-item-title">{item.title}</div>
                  <div className="cart-item-price">{item.price}</div>
                  
                  <div className="cart-item-controls">
                    <button className="cart-btn-qty" onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                    <span className="cart-qty">{item.quantity}</span>
                    <button className="cart-btn-qty" onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
                <i className="fas fa-trash cart-remove" onClick={() => onRemove(item.id)}></i>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          {cartItems.length > 0 && (
            <div style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '5px', fontWeight: '500', color:'#555'}}>Tu Nombre:</label>
              <input 
                type="text" 
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ej: Juan Pérez"
                className="seniat-input"
                style={{width: '100%', padding: '10px'}}
              />
            </div>
          )}

          <div className="cart-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <button 
            className="checkout-btn" 
            onClick={handleCheckout} 
            disabled={loading || cartItems.length === 0}
            style={{opacity: loading ? 0.7 : 1}}
          >
            {loading ? (
              <span>Procesando...</span>
            ) : (
              <>
                <i className="fab fa-whatsapp"></i> Comprar por WhatsApp
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;