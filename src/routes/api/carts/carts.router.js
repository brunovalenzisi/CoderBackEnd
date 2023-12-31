const Router = require("express");
const router = Router();
const CartManager = require("../../../cartManager");
const manager = new CartManager();

router.post("/api/carts", async (req, res) => {
  try {
    await manager.addCart();
    res.status(200).json("Carrito creado con exito");
  } catch {
    (err) => {
      res.status(500).send(err);
    };
  }
});

router.get("/api/carts/:cid", async (req, res) => {
  try {
    const id = req.params.cid;
    const carrito = await manager.getCartById(id);
    if (carrito != "Not found") {
      res.status(200).json(carrito.products);
    } else {
      res.status(404).send("No se pudo encontrar el carrito");
    }
  } catch {
    (err) => {
      res.status(500).send(err);
    };
  }
});

router.post("/api/carts/:cid/product/:pid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    const respuesta = await manager.addToCart(cid, pid);
    res.status(200).json(respuesta);
  } catch {
    (err) => {
      res.status(500).send(err);
    };
  }
});

module.exports = router;
