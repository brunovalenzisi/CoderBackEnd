const express = require('express');
require('dotenv').config()
const ProductManager = require('./productManager');
const manager = new ProductManager();
const exphbs = require('express-handlebars');
const socket = require('socket.io');
const path = require('path');
const session = require("express-session")
const passport = require("passport");
const {initializePassport} = require("./config/passport.config.js")
const MongoStore=require("connect-mongo")
const app = express();
const PORT = 8080;
require("./dbConection")
const {cookie_secret,uri}=require("./config/config.js");
const cookieParser = require('cookie-parser');




app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(session({
  secret: cookie_secret,
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: uri,
    ttl:3600
  })
}))
initializePassport()

app.use(passport.initialize())
app.use(passport.session())

app.use(require('./routes/api/products/products.router'));
app.use(require('./routes/api/carts/carts.router'));
app.use(require('./routes/views/views.router'));
app.use(require('./routes/views/realtimeproducts.router'));
app.use(require('./routes/api/users/user.router'));
app.use(require('./routes/views/sessions.router'));


const httpServer = app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto:', PORT);
});

const io = new socket.Server(httpServer);


io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');
  socket.on('refresh', async() => {
    const products= await manager.getProductsAll() 
    io.sockets.emit("productos",JSON.stringify(products))
  });
  
  socket.on("add", async(product) => {
  const nuevoProducto=JSON.parse(product)
  const{title,description,code,price,stock,category,thumbnails}=nuevoProducto  
  await manager.addProduct(title,description,code,price,stock,category,thumbnails)
  const products= await manager.getProductsAll() 
  io.sockets.emit("productos",JSON.stringify(products))
  })
  
  socket.on("delete", async(id) => {
  await manager.deleteProduct(id)
  const products= await manager.getProductsAll() 
  io.sockets.emit("productos",JSON.stringify(products))
  })
});


