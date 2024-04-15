const UserDTO=require("../DTO/user.dto")
const productsMiddleware =async  (req, res, next) => {
    const user= await UserDTO.obtenerUsuario(req.cookies.coderCookie)
    if (user && user.role === 'user') {
      next();
    } else {
      
      res.status(403).json({ message: 'Acceso denegado. No puedes entrar como administrador.' });
    }
  };
  
  module.exports = productsMiddleware;