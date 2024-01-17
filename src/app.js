const express = require('express');
const app = express();
const PORT = 8080;
const ProductManager = require('./productManager');
const manager = new ProductManager();
const exphbs = require('express-handlebars');
const socket = require('socket.io');
const path = require('path');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require('./routes/api/products/products.router'));
app.use(require('./routes/api/carts/carts.router'));
app.use(require('./routes/views/home.router'));
app.use(require('./routes/views/realtimeproducts.router'));

const httpServer = app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto:', PORT);
});

const io = new socket.Server(httpServer);


io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');
  socket.on('refresh', async() => {
    const products= await manager.getProducts() 
    io.sockets.emit("productos",JSON.stringify(products))
  });
  
  socket.on("add", async(product) => {
  const nuevoProducto=JSON.parse(product)
  const{title,description,code,price,stock,category,thumbnails}=nuevoProducto  
  await manager.addProduct(title,description,code,price,stock,category,thumbnails)
  const products= await manager.getProducts() 
  io.sockets.emit("productos",JSON.stringify(products))
  })
  
  socket.on("delete", async(id) => {
  await manager.deleteProduct(id)
  const products= await manager.getProducts() 
  io.sockets.emit("productos",JSON.stringify(products))
  })
});


