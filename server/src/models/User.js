const mongoose=require('mongoose')

const bookSchema=mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    email:{type:String,required:true},
    books:{type:String,required:true}
})

const Book=mongoose.model('Book',bookSchema)
module.exports=Book;