const express = require('express');
require('dotenv').config()
const ProductRepository = require('./repositories/product.repository.js');
const productRepository = new ProductRepository();
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
const addLogger=require('./utils/logger.utils.js');





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
app.use(addLogger)


app.use(require('./routes/api/products/products.router.js'));
app.use(require('./routes/api/carts/carts.router.js'));
app.use(require('./routes/views/views.router.js'));
app.use(require('./routes/views/realtimeproducts.router.js'));
app.use(require('./routes/api/users/user.router.js'));
app.use(require('./routes/views/sessions.router.js'));
app.use(require('./routes/logger/logger.router.js'))


const httpServer = app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto:', PORT);
});

const io = new socket.Server(httpServer);


io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');
  socket.on('refresh', async() => {
    const products= await productRepository.getProductsAll() 
    io.sockets.emit("productos",JSON.stringify(products))
  });
  
  socket.on("add", async(product) => {
  const nuevoProducto=JSON.parse(product)
  const{title,description,code,price,stock,category,thumbnails}=nuevoProducto  
  await productRepository.addProduct(title,description,code,price,stock,category,thumbnails)
  const products= await productRepository.getProductsAll() 
  io.sockets.emit("productos",JSON.stringify(products))
  })
  
  socket.on("delete", async(id) => {
  await productRepository.deleteProduct(id)
  const products= await productRepository.getProductsAll() 
  io.sockets.emit("productos",JSON.stringify(products))
  })
});


