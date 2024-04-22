const express = require("express");
const router = express.Router();
const passport=require("passport")
const UserController=require("../../../controllers/user.controller.js");
const userController=new UserController()

router.post("/api/users/sign-up",userController.crearUsuario)
router.post("/api/users/login", userController.iniciarSesion);
router.get("/api/users/logout", userController.cerrarSesion)
router.get("/api/users/login-github",passport.authenticate("github",{scope:["user:email"]}),async(req,res)=>{})
router.get("/api/sessions/githubcallback",passport.authenticate('github',{failureRedirect:"/api/users/login"}),userController.autenticarConGitHub) 

module.exports = router; 







