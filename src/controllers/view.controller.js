const ProductRepository=require("../repositories/product.repository.js")
const CartRepository=require("../repositories/cart.repository.js")
const productRepository=new ProductRepository()
const cartRepository=new CartRepository()
const UserDTO=require("../DTO/user.dto.js")
class ViewController {


    async renderLogin (req, res) {
        try{
            const hostURL = `${req.protocol}://${req.get("host")}`;
            res.render("login",{hostURL});
    
        }catch(e){console.error(e)}
    }

    async renderSignUp (req, res)  {
        try{
            res.render("sign-up");
    
        }catch(e){console.error(e)}
    }
   
    async renderProfile (req, res)  {
        try{
            const user= await UserDTO.obtenerUsuario(req.cookies.coderCookie)
            res.render("profile",{user});
    
        }catch(e){console.error(e)}
    }

    async renderProducts (req, res)  {
        try{
            const hostURL = `${req.protocol}://${req.get("host")}`;
            const limit=req.query.limit
            const page=req.query.page
            const query=req.query.query
            const sort=req.query.sort
            const consulta= await productRepository.getProducts(limit, page, query, sort)
            const userData= await UserDTO.obtenerUsuario(req.cookies.coderCookie)
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
                hostURL: hostURL,
                cart:userData.cart}})
                const user={userName:req.user.first_name,admin:req.user.role=="admin",cart:userData.cart}
               res.render("products", {data,consulta,hostURL,user});
    
        }catch(e){console.error(e)}
    }

    async renderCart (req, res)  {
        try{
            
            const cart=req.params.cid
            const consulta= await cartRepository.getCartById(cart)
            const id=consulta._id.toString()
            
           
            const data= consulta.products.map((doc)=>{return{
                _id: doc.product._id,
                code: doc.product.code,
                title: doc.product.title,
                price: doc.product.price,
                description: doc.product.description,
                category: doc.product.category,
                subCategory: doc.product.subCategory,
                thumbnails: doc.product.thumbnails,
                genre: doc.product.genre,
                stock: doc.product.stock,
                quantity: doc.quantity
                }})
    
            res.render("cart", {data,id});
    
        }catch(e){console.error(e)}
    }
    
}


module.exports = ViewController; 