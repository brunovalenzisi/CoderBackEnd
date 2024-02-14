const  mongoose = require('mongoose');
require('dotenv').config()

 mongoose.connect(process.env.URI)
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch(error => {
    console.error('Error al conectar a MongoDB:', error);
  });


