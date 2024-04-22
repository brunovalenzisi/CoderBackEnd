const express = require("express");
const router = express.Router();
const ProductController=require("../../../controllers/product.controller.js")
const productController=new ProductController()

router.get("/api/products",productController.obtenerProductos)
router.get("/api/mokingproducts",productController.obtenerProductosMoking)
router.get("/api/products/:pid",productController.obtenerProductoPorId)
router.post("/api/products",productController.agregarProducto)
router.put("/api/products/:pid",productController.actualizarProducto)
router.delete("/api/products/:pid",productController.eliminarProducto)

module.exports=router