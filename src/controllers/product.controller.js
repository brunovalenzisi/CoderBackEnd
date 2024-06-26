const ProductRepository=require("../repositories/product.repository.js")
const productRepository=new ProductRepository()
const generarFakeProduct=require("../utils/mocking.utils.js")

class ProductController{
    async obtenerProductos (req,res) {

        try{
            const hostURL = `${req.protocol}://${req.get("host")}`;
           
            const limit=req.query.limit
            const page=req.query.page
            const query=req.query.query
            const sort=req.query.sort
            const consulta= await productRepository.getProducts(limit,page,query,sort)
    
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
    
    }

    obtenerProductosMoking=(req,res)=>{
        try {
            const products=[];
            for(let i=0;i<100;i++){
                products.push(generarFakeProduct())
            }
            res.status(200).send(products)
            
        } catch (error) {
            res.status(500).send("error del server")
        }

    }

    async obtenerProductoPorId (req,res){

        try{
            const id= req.params.pid
            const producto = await productRepository.getProductById(id)
            if(producto){
                
                res.status(200).json(producto)}
            else{res.status(404).send("No se pudo encontrar el producto")}
        }
        catch{(err)=>{res.status(500).send(err)}}
    
    }
    async agregarProducto (req,res) {
        const {title,description,code, price,stock,category,subCategory,thumbnails,genre} = req.body
        const nuevoProducto = await productRepository.addProduct(title, description,code, price,stock,category,subCategory,thumbnails,genre)
        res.status(200).json(nuevoProducto)
        
        }
        async actualizarProducto (req,res) {
            try{
                const id= req.params.pid
                const update={...req.body}
                const respuesta= await productRepository.updateProduct(id,update)
                res.status(200).json(respuesta)
               }
            catch{(err)=>{res.status(500).send(err)}}
        }
        async eliminarProducto (req,res){
            try{
                const id= req.params.pid
                const respuesta= await productRepository.deleteProduct(id)
                if(respuesta){
                    res.status(200).json(respuesta)
        
                }else{res.status(404).send("not Found")}
               }
            catch{(err)=>{res.status(500).send(err)}}
        }

        async obtenerMokingProducts(){

             

        }

}

module.exports=ProductController