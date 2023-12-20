const express =require('express');
const PORT= 8080
const ProductManager=require("./productManager");
const manager = new ProductManager
const app = express();





app.use(express.urlencoded({extended: true}));

app.get("/products",async (req,res)=>{

    try{
        const limit=req.query.limit
        const products= await manager.getProducts()
        if(limit){
            const respuesta =products.slice(0, limit)
            const respuestaJson=JSON.stringify(respuesta, null,2)
            res.send(respuestaJson)
        }
        else{
            const respuestaJson=JSON.stringify(products, null,2)
            res.send(respuestaJson)
        }

    }
    catch{(err)=>{res.send(err)}}

})


app.get("/products/:pid",async (req,res)=>{

    try{
        const id= req.params.pid
        const producto=await manager.getProductById(id)
        if(producto){res.json(producto)}
        else{res.send("No se pudo encontrar el producto")}
    }
    catch{(err)=>{res.send(err)}}

})

app.listen(PORT,()=>{console.log("Servidor escuchando en el puerto: ",PORT)})