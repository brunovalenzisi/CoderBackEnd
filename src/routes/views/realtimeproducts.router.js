const express = require("express");
const router = express.Router();
const realTimeProductsMiddleware=require("../../middlewares/realTimeProducts.middleware.js")

router.get("/realtimeproducts",realTimeProductsMiddleware ,async (req, res) => {
    res.render("realTimeProducts");
})

module.exports = router; 