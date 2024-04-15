const jwt=require("jsonwebtoken")
const {jwt_secret_key}=require("../config/config.js");


class UserDTO {

    static async obtenerUsuario(data){
    const user=jwt.verify(data,jwt_secret_key)
    return user

}

}

module.exports = UserDTO