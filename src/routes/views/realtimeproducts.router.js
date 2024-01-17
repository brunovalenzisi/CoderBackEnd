const Router = require("express");
const router = Router();

router.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts");
})

module.exports = router; 