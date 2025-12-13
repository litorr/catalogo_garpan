import API_URL from '../config';

// Helper para obtener headers con Token
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/api/products`);
  if (!res.ok) throw new Error('Error cargando productos');
  return await res.json();
};

export const createProduct = async (productData) => {
  const res = await fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(productData)
  });
  return await res.json();
};

export const updateProduct = async (id, productData) => {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(productData)
  });
  return await res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return await res.json();
};

// Subida de Imagen (Es especial porque no lleva Content-Type: application/json)
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const token = localStorage.getItem('adminToken');

  const res = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }, // Solo Authorization
    body: formData
  });
  return await res.json();
};