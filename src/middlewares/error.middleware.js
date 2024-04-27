const Errors=require("../services/errors/enums.js")

const manejadorDeError = (error, req, res) => {
    
    req.logger.error(error.cause);

    switch (error.code) {
        
        case Errors.TIPO_INVALIDO:
            res.send({ status: "error", error: error.name })
            break;
        default:
            res.send({ status: "error", error: "Error desconocido" });
            
    }
    
}

module.exports = manejadorDeError;
