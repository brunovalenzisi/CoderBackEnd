const Router = require ("express")
const router= Router()
const ProductManager=require("../../../productManager")
const manager = new ProductManager

router.get("/api/products",async (req,res)=>{

    try{
        const hostURL = `${req.protocol}://${req.get("host")}`;
       
        const limit=req.query.limit
        const page=req.query.page
        const query=req.query.query
        const sort=req.query.sort
        const consulta= await manager.getProducts(limit,page,query,sort)

        const respuesta={
            status: consulta?"success":error,
            payload:consulta?consulta.docs:[],
            totalPages:consulta.totalPages,
            prevPage:consulta.prevPage,
            nextPage:consulta.nextPage,
            page:consulta.page,
            hasPrevPage:consulta.hasPrevPage,
            hasNextPage:consulta.hasNextPage,
            prevLink:consulta.hasPrevPage?`${hostURL}/api/products/?page=${consulta.prevPage}`:false,
            nextLink:consulta.hasNextPage?`${hostURL}/api/products/?page=${consulta.nextPage}`:false,
        }
        if(limit){
            respuesta.prevLink+=`&&limit=${limit}`
            respuesta.nextLink+=`&&limit=${limit}`
    }
       
    res.json(respuesta)

    }
    catch{(err)=>{res.status(500).send(err)}}

})


router.get("/api/products/:pid",async (req,res)=>{

    try{
        const id= req.params.pid
        const producto = await manager.getProductById(id)
        if(producto){
            
            res.status(200).json(producto)}
        else{res.status(404).send("No se pudo encontrar el producto")}
    }
    catch{(err)=>{res.status(500).send(err)}}

})

router.post("/api/products",async (req,res)=>{
const {title,description,code, price,stock,category,subCategory,thumbnails,genre} = req.body
const nuevoProducto = await manager.addProduct(title, description,code, price,stock,category,subCategory,thumbnails,genre)
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
        if(respuesta){
            res.status(200).json(respuesta)

        }else{res.status(404).send("not Found")}
       }
    catch{(err)=>{res.status(500).send(err)}}
})





module.exports=router