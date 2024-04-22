class CustomError{
static crearError({nombre="Error",causa="Desconocido",mensaje,codigo=1}){
    const error= new Error(mensaje)
    error.name=nombre;
    error.code=codigo;
    error.cause=causa;
 throw error;
}
}



module.exports=CustomError