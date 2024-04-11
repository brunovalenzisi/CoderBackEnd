const express = require("express");
const router = express.Router();

router.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts");
})

module.exports = router; 