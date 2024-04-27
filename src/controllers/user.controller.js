const {isValidPass,createHash}=require("../utils/bcrypt.utils.js")
const jwt=require("jsonwebtoken");
const UserRepository=require("../repositories/user.repository.js")
const userRepository=new UserRepository
const CartController=require("../controllers/cart.controller.js")
const cartController=new CartController()
const {jwt_secret_key}=require("../config/config.js");
const CustomError=require("../services/errors/custom-error.js");
const { generarInfoError } = require("../services/errors/info.js");
const Errors=require("../services/errors/enums.js");
const manejadorDeError = require("../middlewares/error.middleware.js");



class UserController
{
    async crearUsuario (req,res) {
      const{first_name,last_name,age,email,password}=req.body;
        try {
          if(!first_name || !last_name || !age || !email || !password){
            
            CustomError.crearError({
            nombre:"Nuevo Usuario",
            causa:generarInfoError({first_name,last_name,email,password,age}),
            mensaje:"Error al intentar crear un usuario",
            codigo:Errors.TIPO_INVALIDO})
           
          }
          const existingUser= await userRepository.bucarUsuarioPorEmail(email);
          if (existingUser){res.send("el Usuario ya existe")
         return}
          const payload={
            first_name,
            last_name,
            age,
            email,
            role: password.slice(0,5)==="admin"? "admin" : "user"
          }
          payload.role==="user" && (payload.cart=await cartController.crearCarrito(req,res))
          const token=jwt.sign(payload,jwt_secret_key,{expiresIn:"24h"})
          const newUser={
            ...payload,
            password: createHash(password),
          }
      
          await userRepository.crearUsuario(newUser);
      
         res.cookie("coderCookie",token).redirect("/login")
        } catch (error) {
          manejadorDeError(error,req,res);
          
          }
      
      }
      async iniciarSesion  (req, res)  {
        const { email, password } = req.body;
      
        try {
          const user = await userRepository.bucarUsuarioPorEmail(email);
          if (user) {
            if (isValidPass(password, user.password)) {
             
              const payload={
                first_name:user.first_name, 
                last_name:user.last_name,  
                email:user.email,  
                age:user.age, 
                role:user.role,
                cart:user.cart
              }
              const token=jwt.sign(payload,jwt_secret_key,{expiresIn:"24h"})
              if(payload.role==="user"){
                res.status(200).cookie("coderCookie",token,{maxAge:60*60*1000,httpOnly:true}).redirect("/products")
              }else{
                res.status(200).cookie("coderCookie",token,{maxAge:60*60*1000,httpOnly:true}).redirect("/realtimeproducts")
              }
              
              
            } else {
              res.status(401).send("Contraseña incorrecta");  
            }
          } else {
            res.status(404).send("Usuario no encontrado");
          }
        } catch (e) {
          req.logger.error(e);
          res.status(400).send("Error al iniciar sesión");
        }
      }
      async cerrarSesion (req, res)  {
        if (req.cookies.coderCookie) {
          
          res.clearCookie("coderCookie").redirect("/login")
        } else {
          res.status(404).send("No hay sesión para cerrar");
        }
      }
      async autenticarConGitHub(req,res){
        const payload={
          first_name:req.user.first_name, 
          email:req.user.email,  
          role:req.user.role
        }
        const token =jwt.sign(payload,jwt_secret_key)
        res.cookie("coderCookie",token).redirect("/products")
      }




}
  

  
  module.exports = UserController; 