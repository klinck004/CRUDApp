var express = require('express');
var router = express.Router();

let Book = require("../models/biobooks.js")
/*
router.get('/', function(req,res,next) {
    Book.find((err,BookList) => {
        if(err) {
            return console.error(err);
        } else {
            console.log(BookList);
        }
    })
}) */

router.get('/', async(req,res,next) => {
    try{
        let BookList = await Book.find();
        res.render('biobooks.ejs', {
            title: 'Book List',
            BookList: BookList,
        });
    } catch (err) {
        console.error(err)
        res.render('biobooks', {
            error: 'Error on server'
        });
    }
});

module.exports = router;
