const bcrypt = require('bcrypt');

const createHash=(pass)=>{
     return bcrypt.hashSync(pass,bcrypt.genSaltSync(10))

}
const isValidPass=(pass,hashpass)=>{
   return  bcrypt.compareSync(pass,hashpass)
}


module.exports={createHash, isValidPass}