const express=require('express')
const BookRouter=express.Router()
const Book=require("../../models/Book")

BookRouter.route('/').get(async(req,res)=>{
    const books=await Book.find()
    res.json({status:200, books})
})

BookRouter.route('/id').get((req,res)=>{
    Book.findById(req.params.id,(err,book)=>{
        if(err) throw err;
        res.json({status:200, book})
    })
})

BookRouter.route('/').post((req,res)=>{
    console.log('name: ${req.body.name}')
    Book.findOne({name:req.body.name, done:false}, async(err,book)=>{
        if(err) throw err;
        if(!book){
            const newBook= new Book(req.body);
            await newBook.save().then(()=>{
                res.json({status:201, msg:'new book created in db', newBook})
            })
        }else{
            const msg='this book already exists in db'
            console.log(msg)
            res.json({status:204,msg})
        }
    })
})

BookRouter.route('/:id').put((req,res)=>{
    Book.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,book)=>{
        if(err) throw err;
        res.json({status:204, msg:'todo ${req.params.id} updated in db'})
    })
})

BookRouter.route('/:id').delete((req,res)=>{
    Book.findByIdAndRemove(req,params.id,(err,book)=>{
        if(err) throw err;
        res.json({status: 204, msg:'todo ${req.params.id} removed in db'})
    })
})

module.exports=BookRouter