const Router = require("express");
const router = Router();
const ProductManager=require("../../productManager")
const CartManager=require("../../cartManager")
const productManager = new ProductManager
const cartManager = new CartManager

router.get("/", async (req, res) => {
    try{
        const hostURL = `${req.protocol}://${req.get("host")}`;
        const limit=req.query.limit
        const page=req.query.page
        const query=req.query.query
        const sort=req.query.sort
        const consulta= await productManager.getProducts(limit, page, query, sort)
        const data= consulta.docs.map((doc)=>{return{
            _id: doc._id,
            code: doc.code,
            title: doc.title,
            price: doc.price,
            description: doc.description,
            category: doc.category,
            subCategory: doc.subCategory,
            thumbnails: doc.thumbnails,
            genre: doc.genre,
            stock: doc.stock,
            hostURL: hostURL}})
            
        
        res.render("products", {data,consulta,hostURL});

    }catch(e){console.error(e)}
})
router.get("/carts/:cid", async (req, res) => {
    try{
        
        const cart=req.params.cid
        const consulta= await cartManager.getCartById(cart)
               
        
        res.render("cart", {consulta});

    }catch(e){console.error(e)}
})

module.exports = router; 

