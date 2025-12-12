// Si estamos en Vercel, usa la URL de Render. Si estamos local, usa localhost.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default API_URL;