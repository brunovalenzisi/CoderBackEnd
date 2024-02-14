const cartModel=require("./models/cart.model")


class CartManager {

  async addCart() {
    const newCart = await cartModel.create({products:[]});
    return newCart;
  }

  async getCartById(id) {
    try{
      const cart = await cartModel.findById(id).populate("products.product")
      return cart!=null ? cart : "Not found";

    }
    catch(err){console.log(err)}
  }

  async addToCart(cid, pid) {
    const cart = await cartModel.findById(cid);
    if(!cart){return "No se encuentra el carrito"}

    if (cart.products.some((prod) => prod._id === pid)) {
        const product = cart.products.find((prod) => prod._id === pid);
        product.quantity+=quantity;
        await cart.save()
        return "Producto actualizado con éxito";
    } else {
        cart.products.push({ product: pid});
        await cart.save()
        return "Producto agregado con éxito";
    }
}
  async removeFromCart(cid, pid) {
    const cart = await cartModel.findById(cid);
    if(!cart){return "No se encuentra el carrito"}
    if(cart.products.some(prod=> prod._id.toString() == pid)){
      const index=cart.products.findIndex(product=>product._id==pid)
      cart.products.splice(index, 1);
      await cart.save()
      return "Producto elminado con éxito";
    }
    
}
  
async updateCart(cid,newCart) {
    const cart = await cartModel.findById(cid);
    if(!cart){return "No se encuentra el carrito"}
      cart.products=newCart
      await cart.save()
      return cart;
    }

    async updateProduct(cid,pid,quantity) {
      const cart = await cartModel.findById(cid);
      const product= cart.products.find(prod=>prod.product.toString()==pid)
      if(!cart){return "No se encuentra el carrito"}
        product.quantity=quantity
        await cart.save()
        return product;
      }
    
}



module.exports = CartManager;
