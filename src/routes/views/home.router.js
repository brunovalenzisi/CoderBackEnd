const Router = require("express");
const router = Router();
const ProductManager=require("../../productManager")
const manager = new ProductManager

router.get("/", async (req, res) => {
    const products= await manager.getProducts()
    res.render("home", {products});
})

module.exports = router; 

