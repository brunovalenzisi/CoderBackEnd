const dotenv = require("dotenv")
const program=require("../utils/commander.js")
const {mode} = program.opts()

dotenv.config({
    path:mode==="produccion" ? "./.env.produccion" : "./.env.desarrollo" 
})

const configObject={
    uri:process.env.URI,
    cookie_secret:process.env.COOKIE_SECRET
}


module.exports=configObject