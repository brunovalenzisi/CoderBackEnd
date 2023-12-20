class Product {
  static contadorId = 0;

  constructor(title, description, price, thumbnail, stock, code) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.stock = stock;
    this.code = code;
    this.asignarId();
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
    this.products = [];
  }

  addProduct(title, description, price, thumbnail,code,stock ) {
    if (this.products.find((prod) => prod.code == code)) {
      console.log(
        "el codigo de producto que intenta ingresar ya existe en el invetario"
      );
    } else {
      this.products.push(
        new Product(title, description, price, thumbnail, stock, code)
      );
    }
  }

  getProducts() {
    console.log (this.products);
  }
  getProductById(id) {
    const productoEncontrado = this.products.find((prod) => prod.id == id);
    console.log(productoEncontrado ? productoEncontrado : "Not found")
  }
}

const manager = new ProductManager();
manager.getProducts();
manager.addProduct("Producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)
manager.getProducts();
manager.addProduct("Producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)
manager.getProductById(0)
manager.getProductById(1)

