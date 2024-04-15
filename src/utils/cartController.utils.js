const ProductRepository = require("../repositories/product.repository.js");
const productRepository = new ProductRepository();

const chequearCarrito = async (cart) => {
    const checkedCart = await Promise.all(cart.map(async (art) => {
        const producto = await productRepository.getProductById(art.product._id.toString());
        if (art.quantity <= producto.stock) {
            return art; 
        }
    }));
    return checkedCart.filter((art) => art !== undefined);
};

module.exports = { chequearCarrito };
