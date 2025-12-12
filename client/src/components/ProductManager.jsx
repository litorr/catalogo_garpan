import React, { useState, useEffect } from 'react';
import API_URL from '../config';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', category: 'miscelaneos', image: 'productos/placeholder.png'
  });
  const [editingId, setEditingId] = useState(null); // ID del producto que estamos editando

  // Cargar productos
  const loadProducts = async () => {
    try {
      const res = await fetch('${API_URL}/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  // Manejar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('adminToken');
    // Si hay precio con símbolo $, lo limpiamos, si no, lo enviamos tal cual
    const cleanPrice = parseFloat(formData.price.toString().replace('$', ''));
    
    const payload = { ...formData, price: cleanPrice };
    
    const url = editingId 
      ? `${API_URL}/api/products/${editingId}` 
      : '${API_URL}/api/products';
    
    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: method,
      headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // <--- IMPORTANTE
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert(editingId ? 'Producto actualizado' : 'Producto creado');
      setFormData({ title: '', description: '', price: '', category: 'miscelaneos', image: 'productos/placeholder.png' });
      setEditingId(null);
      loadProducts();
    }
  };

  // Cargar datos en el formulario para editar
  const handleEdit = (product) => {
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price.replace('$', ''), // Quitamos el $ para que sea editable
      category: product.categoria || 'miscelaneos',
      image: product.image
    });
    setEditingId(product.id || product._id);
    // Scroll arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('adminToken');
    if (!window.confirm('¿Seguro que quieres eliminar este producto?')) return;
    
    await fetch(`http://localhost:3001/api/products/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    loadProducts();
  };

  // Función para subir imagen
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const token = localStorage.getItem('adminToken');
    if (!file) return;

    const formDataImg = new FormData();
    formDataImg.append('image', file);

    try {
      const res = await fetch('http://localhost:3001/api/upload', {
      method: 'POST',
      headers: { 
          'Authorization': `Bearer ${token}` // <--- IMPORTANTE (No lleva Content-Type aquí)
      },
      body: formDataImg
      });
      const data = await res.json();
      if (data.success) {
        // Guardamos la ruta (ojo: corregimos las barras invertidas de Windows si aparecen)
        const cleanPath = data.filePath.replace(/\\/g, "/");
        setFormData({ ...formData, image: cleanPath });
      }
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      alert("Error al subir la imagen");
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2 style={{ marginBottom: '1rem', color: '#1f67c5' }}>Gestión de Inventario</h2>

      {/* Formulario */}
      <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '10px', marginBottom: '2rem' }}>
        <h3>{editingId ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          
          <input 
            placeholder="Nombre del Producto" 
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            required
            className="seniat-input"
          />
          
          <input 
            placeholder="Descripción (ej: 1KG)" 
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="seniat-input"
          />
          
          <input 
            type="number" 
            placeholder="Precio ($)" 
            step="0.01"
            value={formData.price}
            onChange={e => setFormData({...formData, price: e.target.value})}
            required
            className="seniat-input"
          />
          
          <select 
            value={formData.category} 
            onChange={e => setFormData({...formData, category: e.target.value})}
            className="seniat-input"
          >
            <option value="reposteria">Repostería</option>
            <option value="confiteria">Confitería</option>
            <option value="helados">Helados</option>
            <option value="miscelaneos">Misceláneos</option>
            <option value="plasticos">Plásticos</option>
            <option value="frutos">Frutos Secos</option>
            <option value="esencias">Esencias</option>
            <option value="bebidas">Bebidas</option>
          </select>

          {/* Input de Imagen Mejorado */}
          <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
            <label style={{fontSize:'0.8rem', color:'#666'}}>Imagen</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              className="seniat-input"
            />
            {formData.image && <small style={{color:'green'}}>Imagen cargada: {formData.image}</small>}
          </div>
          
          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: 1 }}>
              {editingId ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={() => {
                  setEditingId(null);
                  setFormData({ title: '', description: '', price: '', category: 'miscelaneos', image: '' });
                }}
                style={{ padding: '10px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabla de Productos */}
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
        <thead>
          <tr style={{ background: '#eee', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Img</th>
            <th style={{ padding: '10px' }}>Nombre</th>
            <th style={{ padding: '10px' }}>Precio</th>
            <th style={{ padding: '10px' }}>Categoría</th>
            <th style={{ padding: '10px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => ( /* <--- AQUÍ SE DEFINE 'p' */
            <tr key={p.id || p._id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>
                
                {/* CÓDIGO CORREGIDO: Usamos 'p' en lugar de 'product' */}
                <img 
                  src={
                    p.image && p.image.startsWith('uploads') 
                      ? `http://localhost:3001/${p.image}` 
                      : `/${p.image}`
                  } 
                  alt={p.title} 
                  style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} 
                  onError={e => e.target.src = 'https://via.placeholder.com/50'}
                />

              </td>
              <td style={{ padding: '10px' }}>
                <strong>{p.title}</strong><br/>
                <small style={{color:'#777'}}>{p.description}</small>
              </td>
              <td style={{ padding: '10px', color: '#d97706', fontWeight: 'bold' }}>{p.price}</td>
              <td style={{ padding: '10px' }}>{p.categoria}</td>
              <td style={{ padding: '10px' }}>
                <button onClick={() => handleEdit(p)} style={{ marginRight: '5px', padding: '5px 10px', cursor: 'pointer' }}>✏️</button>
                <button onClick={() => handleDelete(p.id || p._id)} style={{ padding: '5px 10px', cursor: 'pointer', background: '#ffdddd', border: '1px solid red' }}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManager;