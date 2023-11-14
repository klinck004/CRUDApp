/*CRUD route file*/
var express = require('express');
let mongoose = require('mongoose');
var router = express.Router();

let Book = require('../models/Bio_books');

/*Read*/
router.get('/', async (req,res,next)=>{ 
    try{
       const BookList = await Book.find();
       res.render('CRUD/Bio_books', {
          title: 'Booklist', 
          BookList: BookList,
       });
    }catch(err){
       console.error(err);
       res.render('CRUD/Bio_books', {
          error: 'Error on server'
       });
    }
 });

/*Create */
/*Get route*/
router.get('/add', async (req,res,next)=>{ 
    res.render('CRUD/add', {
        title: 'Add', 
    })
});
/*Post route*/
router.post('/add', async (req,res,next)=>{ 
    let newBook = Book({
        "name":req.body.name,
        "author":req.body.author,
        "published":req.body.published,
        "description":req.body.description,
        "price":req.body.price,
    });
    console.log(newBook);
    Book.create(newBook)
        .then(() => {
            res.redirect('/book');
        })
        .catch((err) => {
            console.log(err);
            console.log("Add error! :(");
            res.end(err);
        });
    });

/*Update*/
/*Get route*/
router.get('/edit/:id', async (req,res,next)=>{ 
    try{
        let id = req.params.id;
        const bookToEdit = await Book.findById(id)
        res.render('CRUD/edit', {
           title: 'Edit', 
           id: id,
           bookToEdit: bookToEdit,
        });
        console.log("Book to edit");
        console.log(bookToEdit);
     }catch(err){
        console.error(err);
        res.render('CRUD/edit', {
           error: 'Error on server'
        });
     }
    }
);
/*Post route*/
router.post('/edit/:id', async (req,res,next)=>{ 
    let id=req.params.id;
    let updateBook = Book({
        "_id": id,
        "name":req.body.name,
        "author":req.body.author,
        "published":req.body.published,
        "description":req.body.description,
        "price":req.body.price,
    })
    console.log("Post");
    console.log(updateBook);
    Book.updateOne({_id: id}, updateBook)
    .then(() => {
        res.redirect('/book');
    })
    .catch((err) => {
        console.log(err);
        console.log("Edit error! :(");
        res.send(err);
    });
});

/*Delete*/
/*Get route*/
router.get('/delete/:id', async (req,res,next)=>{ 
    let id = req.params.id;
    Book.deleteOne({_id: id}).then(() => {
        res.redirect('/book');
    })
    .catch((err) => {
        console.log(err);
        console.log("Delete error! :(");
        res.send(err);
    })
});


module.exports = router; /*Please do not delete me :(*/