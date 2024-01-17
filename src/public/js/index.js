const socket = io()
let productList=document.getElementById("productList")
socket.emit("refresh")
socket.on("respuesta",(data)=>{
    let products=[]
    products=JSON.parse(data)
    products.forEach(product => {productList.innerHTML+=
   `<div class="producto">
    <h2>${product.title}</h2>
    <p>ID: ${product.id}</p>
    <p>Código: ${product.code}</p>
    <p>Precio: ${product.price}</p>
    <p>Descripción: ${product.description}</p>
    <p>Categoría: ${product.categoria}</p>
    <p>Subcategoría: ${product.subCategoria} </p>
    <p>Género: ${product.genero}</p>
    <p>Stock: ${product.stock}</p>

    
    <div class="thumbnails">
         <p>Imagenes del producto</p>
         ${product.thumbnail.map(link => `<img src="${link}" alt="${product.title}"></img>`).join('')}
    </div>
</div>`
        
    });}
)
