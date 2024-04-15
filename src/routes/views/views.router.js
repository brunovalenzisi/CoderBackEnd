const express = require("express");
const router = express.Router();
const passport = require("passport")
const ViewController=require("../../controllers/view.controller.js")
const viewController=new ViewController()
const productsMiddleware=require("../../middlewares/products.middleware.js")

router.get("/products",passport.authenticate("jwt",{session:false}),productsMiddleware, viewController.renderProducts)
router.get("/carts/:cid", viewController.renderCart)

module.exports = router; 

