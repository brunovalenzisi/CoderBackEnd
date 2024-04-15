const UserDTO=require("../DTO/user.dto")
const realTimeProductsMiddleware =async  (req, res, next) => {
    const user= await UserDTO.obtenerUsuario(req.cookies.coderCookie)
    if (user && user.role === 'admin') {
      next();
    } else {
      
      res.status(403).json({ message: 'Acceso denegado. Debes ser administrador.' });
    }
  };
  
  module.exports = realTimeProductsMiddleware;
  