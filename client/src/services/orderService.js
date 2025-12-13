import API_URL from '../config';

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// Crear orden (Público - No requiere token)
export const createOrder = async (orderData) => {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  return await res.json();
};

// Obtener órdenes (Privado)
export const getOrders = async () => {
  const res = await fetch(`${API_URL}/api/orders`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Error cargando órdenes');
  return await res.json();
};

// Cambiar estado (Privado)
export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/api/orders/${id}/status`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status })
  });
  return await res.json();
};