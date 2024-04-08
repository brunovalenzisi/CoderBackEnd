const express = require("express");
const router = express.Router();
const userModel = require("../../../models/user.model");
const {isValidPass}=require('../../../utils/bcrypt.utils')
const passport=require("passport")
const jwt = require("jsonwebtoken")
const {jwt_secret_key}=require("../../../config/config.js")


router.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      if (isValidPass(password, user.password)) {
       
        const payload={
          first_name:user.first_name, 
          last_name:user.last_name,  
          email:user.email,  
          age:user.age, 
          role:user.role
        }
        const token=jwt.sign(payload,jwt_secret_key,{expiresIn:"24h"})
        
        res.status(200).cookie("coderCookie",token,{maxAge:60*60*1000,httpOnly:true}).redirect("/products")
        
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
});

/*router.post("/api/users/login",passport.authenticate("jwt",{failureRedirect:"/api/users/faillogin"}),async(req,res)=>{
if(!req.user){return res.status(400).send({status:"error",message:"credenciales incalidas"})
}
req.session.user={
first_name:req.user.first_name,
last_name:req.user.last_name,
age:req.user.age,
email:req.user.email}
req.session.login=true
res.status(200).redirect("/products")
})*/

router.get("/api/users/logout", async (req, res) => {
  if (req.cookies.coderCookie) {
    
    res.clearCookie("coderCookie").redirect("/login")
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
  const payload={
    first_name:req.user.first_name, 
    email:req.user.email,  
    role:req.user.role
  }
  const token =jwt.sign(payload,jwt_secret_key)
  res.cookie("coderCookie",token).redirect("/products")
}) 

module.exports = router; 