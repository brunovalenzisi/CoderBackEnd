const Router = require("express");
const router = Router();


router.get("/login", async (req, res) => {
    try{
        const hostURL = `${req.protocol}://${req.get("host")}`;
        res.render("login",{hostURL});

    }catch(e){console.error(e)}
})

router.get("/sign-up", async (req, res) => {
    try{
        res.render("sign-up");

    }catch(e){console.error(e)}
})




module.exports = router; 
