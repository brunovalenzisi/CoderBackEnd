const express = require("express");
const router = express.Router();
const CartController = require("../../../controllers/cart.controller.js");
const cartController = new CartController();

router.post("/api/carts",cartController.crearCarrito);
router.get("/api/carts/:cid", cartController.obtenerCarrito);
router.post("/api/carts/:cid/products/:pid",cartController.agregarAlCarrito);
router.delete("/api/carts/:cid/products/:pid", cartController.quitarDelCarrito);
router.put("/api/carts/:cid",cartController.actualizarCarrito);
router.put("/api/carts/:cid/products/:pid", cartController.actualizarCatidad);
router.delete("/api/carts/:cid",cartController.limpiarCarrito);
router.delete("/api/carts/:cid",cartController.limpiarCarrito);
router.get("/api/carts/:cid/purchase",cartController.comprarCarrito);

module.exports = router;
