const mongoose = require('mongoose')
const usersCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: {type: String,required: true},
    last_name: {type: String,required: true},
    email: {type: String,required: true,index:true,unique:true},
    age: {type: Number,required: true},
    password: {type: String,required: true},
    role:{type: String,default:"user"}
    })


    const userModel = mongoose.model(usersCollection,userSchema)

    module.exports =userModel