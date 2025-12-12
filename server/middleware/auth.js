const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // 1. Leer el token del header (Formato: "Bearer <token>")
  const tokenHeader = req.header('Authorization');
  
  // 2. Si no hay token, acceso denegado
  if (!tokenHeader) {
    return res.status(401).json({ success: false, error: 'No hay token, permiso denegado' });
  }

  try {
    // 3. Limpiar el prefijo "Bearer " si existe
    const token = tokenHeader.replace('Bearer ', '');

    // 4. Verificar token con la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 5. Guardar datos del usuario en la petición y dejar pasar
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: 'Token inválido' });
  }
};