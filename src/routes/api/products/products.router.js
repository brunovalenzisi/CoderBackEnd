const Router = require ("express")
const router= Router()
const ProductManager=require("../../../productManager")
const manager = new ProductManager

router.get("/api/products",async (req,res)=>{

    try{
        const limit=req.query.limit
        const products= await manager.getProducts()
        if(limit){
            const respuesta =products.slice(0, limit)
            const respuestaJson=JSON.stringify(respuesta, null,2)
            res.status(200).send(respuestaJson)
        }
        else{
            const respuestaJson=JSON.stringify(products, null,2)
            res.status(200).send(respuestaJson)
        }

    }
    catch{(err)=>{res.status(500).send(err)}}

})


router.get("/api/products/:pid",async (req,res)=>{

    try{
        const id= req.params.pid
        const producto=await manager.getProductById(id)
        if(producto){
            
            res.status(200).json(producto)}
        else{res.status(404).send("No se pudo encontrar el producto")}
    }
    catch{(err)=>{res.status(500).send(err)}}

})

router.post("/api/products",async (req,res)=>{
const {title, description,code, price,stock,category,thumbnails} = req.body
const nuevoProducto = await manager.addProduct(title, description,code, price,stock,category,thumbnails)
res.status(200).json(nuevoProducto)
})

router.put("/api/products/:pid",async (req,res)=>{
    try{
        const id= req.params.pid
        const update={...req.body}
        const respuesta= await manager.updateProduct(id,update)
        res.status(200).json(respuesta)
       }
    catch{(err)=>{res.status(500).send(err)}}
})

router.delete("/api/products/:pid",async (req,res)=>{
    try{
        const id= req.params.pid
        const respuesta= await manager.deleteProduct(id)
        res.status(200).json(respuesta)
       }
    catch{(err)=>{res.status(500).send(err)}}
})





module.exports=router