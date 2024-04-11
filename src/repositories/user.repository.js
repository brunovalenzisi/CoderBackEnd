const userModel=require("../models/user.model.js")

class UserRepository{

async bucarUsuarioPorEmail(email){
    const usuario=await userModel.findOne({email: email})
    return usuario
}

async crearUsuario(data){
   const newUser= await userModel.create(data)
   return newUser

}

}


module.exports = UserRepository