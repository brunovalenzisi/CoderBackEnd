const fs = require("fs");

class Product {
  static contadorId = 0;

  constructor(title, description, price, thumbnail, stock, code) {
    this.asignarId();
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }

  static incrementarContador() {
    Product.contadorId++;
  }

  asignarId() {
    this.id = Product.contadorId;
    Product.incrementarContador();
  }
}

class ProductManager {
  constructor() {
    this.path = "./products.json";
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const products = await this.readFile();
    if (products.find((prod) => prod.code == code)) {
      console.log(
        "el codigo de producto que intenta ingresar ya existe en el invetario"
      );
    } else {
      products.push(
        new Product(title, description, price, thumbnail, stock, code)
      );
      const data = JSON.stringify(products);
      await fs.promises.writeFile(this.path, data, "utf-8");
    }
  }

  async getProducts() {
    const products = await this.readFile();
    console.log(products);
  }
  async getProductById(id) {
    const products = await this.readFile();
    const productoEncontrado = products.find((prod) => prod.id == id);
    console.log(productoEncontrado ? productoEncontrado : "Not found");
  }
  async readFile() {
    const data = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    return data;
  }

  async clearProducts() {
    const data = JSON.stringify([]);
    await fs.promises.writeFile(this.path, data, "utf-8");
  }
  async updateProduct(id, updatedInfo) {
    if ("id" in updatedInfo) {
      console.log("No puedes actualizar el id del producto");
    } else {
      const products = await this.readFile();
      const productIndex = products.findIndex((prod) => prod.id === id);
      if (productIndex === -1) {
        console.log("Producto no encontrado");
        return;
      }
      const existingProduct = products[productIndex]
      
      Object.assign(existingProduct, updatedInfo);
      products[productIndex] = existingProduct;
      const data = JSON.stringify(products);
      await fs.promises.writeFile(this.path, data, "utf-8");
    }
  }

  async deleteProduct(id) {
    const products = await this.readFile();
    const productIndex = products.findIndex((prod) => prod.id === id);
    if (productIndex === -1) {
      console.log("Producto no encontrado");
      return;
    }
    products.splice(productIndex, 1);
    const data = JSON.stringify(products);
    await fs.promises.writeFile(this.path, data, "utf-8");
  }
}

const manager = new ProductManager();

async function demo() {
  await manager.clearProducts();
  await manager.getProducts();
  await manager.addProduct(
    "Producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  await manager.getProducts();
  await manager.addProduct(
    "Producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  await manager.getProductById(0);
  await manager.getProductById(1);
  await manager.updateProduct(0, { id: 0, price: 250, stock: 20 });
  await manager.getProductById(0);
  await manager.updateProduct(0, { price: 250, stock: 20 });
  await manager.getProductById(0);
  await manager.deleteProduct(1);
  await manager.deleteProduct(0);
  await manager.getProducts()
}
demo();
