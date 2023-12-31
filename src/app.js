const express =require('express');
const PORT= 8080
const ProductManager=require("./productManager");
const manager = new ProductManager
const app = express();





app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(require("./routes/api/products/products.router"))
app.use(require("./routes/api/carts/carts.router"))

app.listen(PORT,()=>{console.log("Servidor escuchando en el puerto: ",PORT)})