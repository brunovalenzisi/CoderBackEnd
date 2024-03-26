const {Command} =require("commander")
const program= new Command()



program.option("--mode <mode>","Modo de trabajo","produccion")
program.parse()
module.exports = program