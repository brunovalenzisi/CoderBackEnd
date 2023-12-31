const fs = require("fs").promises;

class Cart {
  constructor() {
    this.products = [];
  }

  static async readFile() {
    try {
      const data = await fs.readFile("./carts.json", "utf-8");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return [];
    }
  }

  async asignarId() {
    const id = Math.floor(Math.random() * 10000000);
    const carts = await Cart.readFile();
    const idExists = carts.some((cart) => cart.id == id);

    if (idExists) {
      await this.asignarId();
    } else {
      this.id = id;
    }
  }
}

class CartManager {
  constructor() {
    this.path = "./carts.json";
  }

  async addCart() {
    const carts = await CartManager.readFile();
    const nuevoCarrito = new Cart();

    await nuevoCarrito.asignarId();

    carts.push(nuevoCarrito);
    await CartManager.writeFile(carts);
    return nuevoCarrito;
  }

  static async writeFile(carts) {
    try {
      const data = JSON.stringify(carts, null, 2);
      await fs.writeFile("./carts.json", data, "utf-8");
    } catch (error) {
      console.error("Error al escribir en el archivo:", error);
    }
  }

  static async readFile() {
    return Cart.readFile();
  }

  async getCartById(id) {
    const carts = await CartManager.readFile();
    const carritoEncontrado = carts.find((cart) => cart.id == id);
    return carritoEncontrado ? carritoEncontrado : "Not found";
  }

  async addToCart(cid, pid) {
    const carts = await CartManager.readFile();
    const carritoEncontrado = carts.find((cart) => cart.id == cid);
    if(!carritoEncontrado){return "No se encuentra el carrito"}

    if (carritoEncontrado.products.some((prod) => prod.id === pid)) {
        const product = carritoEncontrado.products.find((prod) => prod.id === pid);
        product.quantity++;
        await CartManager.writeFile(carts);
        return "Producto actualizado con éxito";
    } else {
        carritoEncontrado.products.push({ id: pid, quantity: 1 });
        await CartManager.writeFile(carts);
        return "Producto agregado con éxito";
    }
}

}

module.exports = CartManager;
