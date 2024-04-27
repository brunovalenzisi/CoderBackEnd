const express = require("express");
const router = express.Router();

router.get("/loggertest",(req,res)=>{
    req.logger.error("Esto es un error")
    req.logger.fatal("Esto es un error fatal")
    req.logger.debug("Esto es un mensaje de debug")
    req.logger.info("Esto es un mensaje de info")
    req.logger.warning("Esto es un mensaje de warning")
    req.logger.http("este es un mensaje http")
    res.send("CHECK")
})
module.exports = router