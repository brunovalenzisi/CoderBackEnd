const productModel=require("./models/product.model")





class ProductManager {

  async addProduct(
    title,
    description,
    code,
    price,
    stock,
    category,
    subCategory,
    thumbnails,
    genre
  ) {
    const disponible= await productModel.findOne({code:code})
    if (disponible!=null) {
      return "El código de producto que intenta ingresar ya existe en el inventario";
    } else {
      const nuevoProducto =await productModel.create({
        title: title,
        description: description,
        code: code,
        price: price,
        stock: stock,
        category: category,
        subCategory: subCategory,
        thumbnails: thumbnails,
        genre:genre
      }) 
      return nuevoProducto;
    }
  }

  async getProducts(limit, page, query, sort) {
    const options = {};
    let filtro = {};

    
    limit ? options.limit = limit : options.limit = 10;
    page ? options.page = page : options.page = 1;
    if(sort){
      if(sort=="asc"){options.sort={price:1}}
      else if(sort=="desc"){options.sort={price:-1}}
    }
    if (query) {
        filtro = { "category": query }; 
    }

  

    const consulta = await productModel.paginate(filtro, options);
    return consulta;
}


  async getProductById(id) {
    try {
      const product = await productModel.findById(id);
      if (product) {
        return product;
      } else {
        return null; 
      }
    } catch (error) {
     console.log("el id no es valido")
    }
  }
 
  async updateProduct(id, updatedInfo) {
    if ("_id" in updatedInfo) {
      console.log("No puedes actualizar el id del producto")
      return("No puedes actualizar el id del producto");
    } else {
      const product = await this.getProductById(id);
      if (product!=null) {
        Object.assign(product, updatedInfo);
        await product.save()
        return product
      }
      else return "no se puede encontrar el producto"
      
    }
  }

  async deleteProduct(id) {
    try {
      const product = await productModel.findByIdAndDelete(id);
      if (product) {
        return product;
      } else {
        return null; 
      }
    } catch (error) {
     console.log("el id no es valido")
    }
  
  }

 
}

module.exports = ProductManager;
