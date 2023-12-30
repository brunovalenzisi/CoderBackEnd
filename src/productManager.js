const fs = require("fs").promises;

class Product {
  constructor(title, description, code, price, stock, category, thumbnails) {
    this.asignarId();
    this.title = title;
    this.description = description;
    this.code = code;
    this.price = price;
    this.status = true;
    this.stock = stock;
    this.category = category;
    this.thumbnails = thumbnails;
  }

  static async readFile() {
    try {
      const data = await fs.readFile("./products.json", "utf-8");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return [];
    }
  }

  async asignarId() {
    const id = Math.floor(Math.random() * 10000000);
    const products = await Product.readFile();

    const idExists = products.some((prod) => prod.id === id);

    if (idExists) {
      await this.asignarId();
    } else {
      this.id = id;
    }
  }
}

class ProductManager {
  constructor() {
    this.path = "./products.json";
  }

  async addProduct(
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails
  ) {
    const products = await ProductManager.readFile();
    if (products.some((prod) => prod.code === code)) {
      return "El código de producto que intenta ingresar ya existe en el inventario";
    } else {
      const nuevoProducto = new Product(
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails
      );

      await nuevoProducto.asignarId();

      console.log(nuevoProducto);
      products.push(nuevoProducto);
      await ProductManager.writeFile(products);
      return nuevoProducto;
    }
  }

  async getProducts() {
    return ProductManager.readFile();
  }

  async getProductById(id) {
    const products = await ProductManager.readFile();
    const productoEncontrado = products.find((prod) => prod.id == id);
    return productoEncontrado ? productoEncontrado : "Not found";
  }

  static async writeFile(products) {
    try {
      const data = JSON.stringify(products, null, 2);
      await fs.writeFile("./products.json", data, "utf-8");
    } catch (error) {
      console.error("Error al escribir en el archivo:", error);
    }
  }

  async clearProducts() {
    await ProductManager.writeFile([]);
  }

  async updateProduct(id, updatedInfo) {
    if ("id" in updatedInfo) {
      return("No puedes actualizar el id del producto");
    } else {
      const products = await ProductManager.readFile();
      console.log(products)
      const productIndex = products.findIndex((prod) => prod.id == id);
      if (productIndex === -1) {
        return("Producto no encontrado");
        
      }
      const existingProduct = products[productIndex];
      Object.assign(existingProduct, updatedInfo);
      await ProductManager.writeFile(products);
      return existingProduct
    }
  }

  async deleteProduct(id) {
    const products = await ProductManager.readFile();
    const productIndex = products.findIndex((prod) => prod.id === id);
    if (productIndex === -1) {
      console.log("Producto no encontrado");
      return;
    }
    products.splice(productIndex, 1);
    await ProductManager.writeFile(products);
  }

  static async readFile() {
    return Product.readFile();
  }
}

module.exports = ProductManager;
