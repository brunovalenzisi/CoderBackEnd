const cartModel=require("../models/cart.model.js")


class CartRepository {

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
    try {
        const cart = await cartModel.findById(cid);
        const existingProductIndex = cart.products.findIndex((prod) => prod.product.toString() === pid);

        if (existingProductIndex !== -1) {
           
            cart.products[existingProductIndex].quantity++;
            await cart.save();
            return "Producto actualizado con éxito";
        } else {
          
            cart.products.push({ product: pid });
            await cart.save();
            return "Producto agregado con éxito";
        }
    } catch (error) {
        console.log(error);
        return "Error al agregar el producto";
    }
}

  async removeFromCart(cid, pid) {
    try{
      const cart = await cartModel.findById(cid);
      if(cart.products.some(prod=> prod.product.toString() == pid)){
        const index=cart.products.findIndex(product=>product._id==pid)
        cart.products.splice(index, 1);
        await cart.save()
        return "Producto elminado con éxito";
      }else{return "No se encuentra el producto"}

    }catch(error){ 
      console.log(error);
      return "Error al actualizar el carrito";}
    
}
  
async updateCart(cid,newCart) {
  try{
    const cart = await cartModel.findById(cid);
      cart.products=newCart
      await cart.save()
      return cart;

  }catch(error){
    console.log(error);
    return "Error al actualizar el carrito";
  }
    }

    async updateProduct(cid,pid,quantity) {
      try{
        const cart = await cartModel.findById(cid);
        const product= cart.products.find(prod=>prod.product.toString()==pid)
        product.quantity=quantity
        await cart.save()
        return product;

      }
      catch (error) {
        console.log(error);
        return "Error al actualizar el producto";
    }
      }

      async clearCart(cid) {
        try {
            const cart = await cartModel.findById(cid);
            cart.products = [];
            await cart.save();
            return "El carrito está vacío";
        } catch (error) {
            console.log(error);
            return "Error al limpiar el carrito";
        }
    }
    
}



module.exports = CartRepository;