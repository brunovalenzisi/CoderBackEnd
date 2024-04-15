const ProductRepository = require("../repositories/product.repository.js");
const TicketRepository = require("../repositories/ticket.repository.js");
const productRepository = new ProductRepository();
const ticketRepository = new TicketRepository();

const chequearCarrito = async (cart) => {
  const checkedCart = await Promise.all(
    cart.map(async (art) => {
      const producto = await productRepository.getProductById(
        art.product._id.toString()
      );
      if (art.quantity <= producto.stock) {
        art.ok=true
        return art;
      }else{art.ok=false;return art}
    })
  );

  const  conStock=checkedCart.filter((art) => art.ok)
  const  sinStock=checkedCart.filter((art) => !art.ok)
  return {conStock, sinStock}
  
};

const generarTicket = async (cart, user) => {
  const code = await generarCodigo();
  const amount = await calcularPrecio(cart);
  const purchaser = user.email;

  return { code, amount, purchaser };
};

const generarCodigo = async () => {
  const code = Math.floor(Math.random() * 100000000);
  const isOk = await ticketRepository.checkTicket(code);
  return isOk ? code : generarCodigo();
};

const calcularPrecio = async (cart) => {
  let total = 0;

  cart.forEach((art) => {
    total += art.product.price * art.quantity;
  });

  return total.toFixed(2);
};

module.exports = { chequearCarrito, generarTicket };
