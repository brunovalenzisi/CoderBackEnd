const express = require("express");
const router = express.Router();
const userModel = require("../../../models/user.model");
const {createHash}=require('../../../utils/bcrypt.utils')
const jwt=require("jsonwebtoken")
const{jwt_secret_key}=require("../../../config/config.js")

/*router.post("/api/users/sign-up", async (req, res) => {
  const  { first_name, last_name, email, password, age } = req.body;

  try {
    const user={ first_name, last_name, email,password:createHash(password),age} 
    await userModel.create(user);
    res.redirect("/login");
  } catch (e) {
    console.log(e);
    res.status(400).send("Error al crear usuario");
  }
});*/

router.post("/api/users/sign-up",async (req,res)=>{
  try {
    const{first_name,last_name,age,email,password}=req.body;
    const existingUser= await userModel.findOne({email: email});
    if (existingUser){res.send("el Usuario ya existe")
   return}
 
    const payload={
      first_name,
      last_name,
      age,
      email,
      role: password.slice(0,5)==="admin"? "admin" : "user"
    }
    const token=jwt.sign(payload,jwt_secret_key,{expiresIn:"24h"})
    const newUser={
      ...payload,
      password: createHash(password),
    }

    await userModel.create(newUser);

   res.cookie("coderCookie",token).redirect("/login")
  } catch (error) {
    res.send(error.message)
  }






})





module.exports = router;

