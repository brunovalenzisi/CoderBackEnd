const  mongoose = require('mongoose');
const{uri}=require('./config/config.js')


 mongoose.connect(uri)
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch(error => {
    console.error('Error al conectar a MongoDB:', error);
  });


