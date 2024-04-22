const {faker} = require("@faker-js/faker")

const  generarImagenes=()=>{
const imagenes=[]
for (let i=0; i<3;i++){
const nuevaImagen=faker.image.url()
imagenes.push(nuevaImagen)
}
    return imagenes
}


const generarFakeProduct=()=>{
const fakeProduct={
    code:parseInt(faker.string.numeric(10)),
    title:faker.commerce.productName(),
    price:faker.commerce.price(),
    description:faker.commerce.productDescription(),
    category:faker.commerce.productAdjective(),
    subCategory:faker.commerce.productAdjective(),
    thumbnails: generarImagenes(),
    genre: faker.person.sex(),
    stock: parseInt(faker.string.numeric(2))
    }
return fakeProduct

}

module.exports=generarFakeProduct

