const express = require("express");
const router = express.Router();
const userModel = require("../../../models/user.model");
const {isValidPass}=require('../../../utils/bcrypt.utils')
const passport=require("passport")


/*router.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      if (isValidPass(password, user.password)) {

        if(user.email === "adminCoder@coder.com" && user.password ==="adminCod3r123") {req.session.role="admin"}else{req.session.role==="user"}
        req.session.user_first_name=user.first_name;
        req.session.login = true;
        res.status(200).redirect("/products")
        
      } else {
        res.status(401).send("Contraseña incorrecta");  
      }
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (e) {
    console.log(e);
    res.status(400).send("Error al iniciar sesión");
  }
});*/

router.post("/api/users/login",passport.authenticate("login",{failureRedirect:"/api/users/faillogin"}),async(req,res)=>{
if(!req.user){return res.status(400).send({status:"error",message:"credenciales incalidas"})
}
req.session.user={
first_name:req.user.first_name,
last_name:req.user.last_name,
age:req.user.age,
email:req.user.email}

req.session.login=true
res.status(200).redirect("/products")
})

router.get("/api/users/logout", async (req, res) => {
  if (req.session.login) {
    req.session.destroy();
    res.redirect("/login")
  } else {
    res.status(404).send("No hay sesión para cerrar");
  }
});

router.get("/api/users/faillogin",
async(req,res)=>{
  res.send("Error de autenticacion")
})



router.get("/api/users/login-github",passport.authenticate("github",{scope:["user:email"]}),async(req,res)=>{})

router.get("/api/sessions/githubcallback",passport.authenticate('github',{failureRedirect:"/api/users/login"}),async(req,res)=>{
  req.session.user=req.user
  req.session.login=true
  res.redirect("/products")
}) 

module.exports = router; 