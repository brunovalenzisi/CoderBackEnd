const  mongoose = require('mongoose');
const uri=process.env.URI


 mongoose.connect(uri)
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch(error => {
    console.error('Error al conectar a MongoDB:', error);
  });


