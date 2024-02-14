const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const productsCollection="products"

const productSchema = new mongoose.Schema({
code: {type: Number,required:true,unique:true},
title: {type: String},
price: {type: Number},
description: {type: String},
category: {type: String},
subCategory: {type: String},
thumbnails: {type: Array },
genre: {type: String},
stock: {type: Number },
})
productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productsCollection,productSchema)

module.exports =productModel