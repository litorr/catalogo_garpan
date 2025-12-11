import React from 'react';

const CartModal = ({ isOpen, onClose, cartItems, onRemove, onUpdateQuantity }) => {
  if (!isOpen) return null;

  // Calcular total general
  const total = cartItems.reduce((sum, item) => {
    // Limpiamos el precio (quitamos el '$' si viene en el string) y lo convertimos a número
    const price = parseFloat(item.price.replace('$', '')); 
    return sum + (price * item.quantity);
  }, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return alert('Tu carrito está vacío');

    let message = "Hola, quiero realizar el siguiente pedido:\n\n";
    
    cartItems.forEach(item => {
        const price = parseFloat(item.price.replace('$', ''));
        const itemTotal = price * item.quantity;
        message += `- ${item.quantity}x ${item.title} (${item.description}) - $${itemTotal.toFixed(2)}\n`;
    });

    message += `\n*Total: $${total.toFixed(2)}*`;
    
    // Reemplaza con tu número de teléfono real
    const phoneNumber = "584141914478"; 
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="cart-modal active">
      <div className="cart-content">
        <span className="close-cart" onClick={onClose}>&times;</span>
        <h2 style={{color: '#1f67c5'}}>Tu Carrito</h2>
        
        <div className="cart-items">

          {cartItems.length === 0 ? (
            <p style={{textAlign:'center', color:'#888', marginTop:'2rem'}}>
              Tu carrito está vacío 😔
            </p>
          ) : (
            cartItems.map((item) => (

              <div key={item.id} className="cart-item">

                <img 
                  src={item.image ? `/${item.image}` : '/placeholder.png'} 
                  alt={item.title} 
                  onError={(e) => {e.target.src = 'https://via.placeholder.com/60'}}
                />

                <div className="cart-item-details">

                  <div className="cart-item-title">{item.title}</div>
                  <div className="cart-item-price">{item.price}</div>
                  
                  <div className="cart-item-controls">
                    <button 
                      className="cart-btn-qty" 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                    >-</button>
                    <span className="cart-qty">{item.quantity}</span>
                    <button 
                      className="cart-btn-qty" 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                    >+</button>
                  </div>

                </div>
                <i 
                  className="fas fa-trash cart-remove" 
                  onClick={() => onRemove(item.id)}
                ></i>
              </div>
              
            ))
          )}

        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            <i className="fab fa-whatsapp"></i> Comprar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;