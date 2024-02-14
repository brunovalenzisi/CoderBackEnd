const Router = require("express");
const router = Router();
const CartManager = require("../../../cartManager");
const manager = new CartManager();



router.post("/api/carts", async (req, res) => {
  try {
    const newCart= await manager.addCart();
    res.status(200).json(newCart);
  } catch {
    (err) => {
      res.status(500).send(err);
    };
  }
});

router.get("/api/carts/:cid", async (req, res) => {
  try {
    const id = req.params.cid
    const carrito = await manager.getCartById(id)
    
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
});

router.post("/api/carts/:cid/products/:pid", async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid;
    

    const respuesta = await manager.addToCart(cid, pid);
    res.status(200).json(respuesta);
  } catch {
    (err) => {
      res.status(500).send(err);
    };
  }
});


router.delete("/api/carts/:cid/products/:pid", async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid;
    const respuesta = await manager.removeFromCart(cid, pid);
    res.status(200).json(respuesta);
  } catch {
    (err) => {
      res.status(500).send(err);
    };
  }
});

router.put("/api/carts/:cid", async (req, res) => {
  try {
    const newCart=req.body
    const cid = req.params.cid
    const respuesta = await manager.updateCart(cid,newCart);
    res.status(200).json(respuesta);
  } catch {
    (err) => {
      res.status(500).send(err);
    };
  }
});

router.put("/api/carts/:cid/products/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity=req.body.quantity
    console.log(cid,pid,quantity);
    const respuesta = await manager.updateProduct(cid, pid,quantity);
    res.status(200).json(respuesta);
  } catch {
    (err) => {
      res.status(500).send(err);
    };
  }
});



module.exports = router;
