const socket = io()
let productList=document.getElementById("productList")

let title=document.getElementById("title")
let code=document.getElementById("code")
let price=document.getElementById("price")
let description=document.getElementById("description")
let categoria=document.getElementById("categoria")
let stock=document.getElementById("stock")

socket.emit("refresh")

socket.on("productos",(data)=>{
    let products=[]
    productList.innerHTML=""
    products=JSON.parse(data)
    products.forEach(product => {productList.innerHTML+=
        `<div class="producto">
        <h2>${product.title}</h2>
        <p>ID: ${product._id}</p>
        <p>Código: ${product.code}</p>
        <p>Precio: ${product.price}</p>
        <p>Descripción: ${product.description}</p>
        <p>Categoría: ${product.category}</p>
        <p>Stock: ${product.stock}</p>
        <div class="thumbnails">
            <p>Imagenes del producto</p>
            ${product.thumbnails.map(link => `<a href=${link}>${link}</p>`).join('')}
        </div>
        <button onclick="eliminarProducto('${product._id}')">Eliminar</button>
    </div>`;
        
    });}
)

function guardarProducto(){
    
   if(code.value,title.value,price.value,description.value,categoria.value,stock.value){

       const nuevoProducto ={
           code:code.value,
           title: title.value,
           price: price.value,
           description: description.value,
           category: categoria.value,
           stock:stock.value
   }
   socket.emit("add",JSON.stringify(nuevoProducto))
 
}else(alert("debes completar todos los campos"))


}


function eliminarProducto(id){
    socket.emit("delete",id)
}