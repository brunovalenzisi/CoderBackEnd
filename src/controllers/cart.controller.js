const CartRepository=require("../repositories/cart.repository.js")
const cartRepository=new CartRepository()

class CartController {

    async crearCarrito (req, res) {
        try {
          const newCart= await cartRepository.addCart();
          return newCart;
          
        } catch {
          (err) => {
            res.status(500).send(err);
          };
        }
      }
      async obtenerCarrito (req, res) {
        try {
          const id = req.params.cid
          const carrito = await cartRepository.getCartById(id)
          
          if (carrito != undefined) { 
            res.status(200).json(carrito);
          } else {
            res.status(404).send("No se pudo encontrar el carrito");
          }
        } catch {
          (err) => {
            res.status(500).send(err);
          };
        }
      }

      async agregarAlCarrito (req, res)  {
        try {
          const cid = req.params.cid
          const pid = req.params.pid;
          
      
          const respuesta = await cartRepository.addToCart(cid, pid);
          res.status(200).json(respuesta);
        } catch {
          (err) => {
            res.status(500).send(err);
          };
        }
      }

      async quitarDelCarrito (req, res) {
        try {
          const cid = req.params.cid
          const pid = req.params.pid;
          const respuesta = await cartRepository.removeFromCart(cid, pid);
          res.status(200).json(respuesta);
        } catch {
          (err) => {
            res.status(500).send(err);
          };
        }
      }

      async actualizarCarrito (req, res)  {
        try {
          const newCart=req.body
          const cid = req.params.cid
          const respuesta = await cartRepository.updateCart(cid,newCart);
          res.status(200).json(respuesta);
        } catch {
          (err) => {
            res.status(500).send(err);
          };
        }
      }
      async actualizarCatidad (req, res)  {
        try {
          const cid = req.params.cid;
          const pid = req.params.pid;
          const quantity=req.body.quantity
          const respuesta = await cartRepository.updateProduct(cid, pid,quantity);
          res.status(200).json(respuesta);
        } catch {
          (err) => {
            res.status(500).send(err);
          };
        }
      }

      async limpiarCarrito (req, res)  {
        try {
          const cid = req.params.cid
          const respuesta = await cartRepository.clearCart(cid);
          res.status(200).json(respuesta);
        } catch {
          (err) => {
            res.status(500).send(err);
          };
        }
      }

}

module.exports = CartController;