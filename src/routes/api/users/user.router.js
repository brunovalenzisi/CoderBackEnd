const express = require("express");
const router = express.Router();
const userModel = require("../../../models/user.model");
const {createHash}=require('../../../utils/bcrypt.utils')
const passport=require("passport")

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

router.post("/api/users/sign-up",passport.authenticate("sign-up",{
  failureRedirect:"/api/users/sign-up/fail"
}),async (req,res)=>{
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

router.get("/api/users/sign-up/fail",(req,res)=>{
  res.send("Registro fallido")
})



module.exports = router;

