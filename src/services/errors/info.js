const generarInfoError=(usuario)=>{
    return `Los datos estan incompletos o no son validos.
    Necesitamos recibir los siguientes datos:
   -First_Name:String, recibimos ${usuario.first_name}, 
   -Last_name:String,recibimos ${usuario.last_name}, 
   -Email:String,recibimos ${usuario.email},
   -Age:Number,recibimos ${usuario.age},
   -Password:String,recibimos ${usuario.password},
   `

}


module.exports={generarInfoError}