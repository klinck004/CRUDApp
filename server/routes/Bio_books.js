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
        test: 'test',
    })
});
/*Post route*/
router.post('/add', async (req,res,next)=>{ 
    console.log("NEW");
    let newBook = Book({
        "name":req.body.name,
        "author":req.body.author,
        "published":req.body.published,
        "description":req.body.description,
        "price":req.body.price,
    });
    console.log("log");
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
});
/*Post route*/
router.post('/edit/:id', async (req,res,next)=>{ 
});

/*Delete*/
/*Get route*/
router.get('/delete/:id', async (req,res,next)=>{ 
});
/*Post route*/
router.post('/delete/:id', async (req,res,next)=>{ 
});

module.exports = router; /*Please do not delete me :(*/