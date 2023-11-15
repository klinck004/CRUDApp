/*CRUD route file*/
var express = require('express');
let mongoose = require('mongoose');
var router = express.Router();

let Assign = require('../models/assignment'); /* use Assignment model defined in models folder */

/*Read*/
router.get('/', async (req,res,next)=>{ 
    try{
       const AssignList = await Assign.find();
       res.render('CRUD/list', {
          title: 'Assignment List', 
          AssignList: AssignList,
       });
    }catch(err){
       console.error(err);
       res.render('CRUD/error', {
          error: 'Error on server'
       });
    }
 });

/*Create */
/*Get route*/
router.get('/add', async (req,res,next)=>{ 
    res.render('CRUD/add', {
        title: 'Add New Assignment', 
    })
});
/*Post route*/
router.post('/add', async (req,res,next)=>{ 
    let newAssign = Assign({
        "name":req.body.name,
        "class":req.body.class,
        "due":req.body.due,
        "notes":req.body.notes,
        "mark":req.body.mark,
        "weight":req.body.weight,
    });
    Assign.create(newAssign)
        .then(() => {
            res.redirect('/list');
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
        const assignToEdit = await Assign.findById(id)
        res.render('CRUD/edit', {
           title: 'Edit Assignment', 
           id: id,
           assignToEdit: assignToEdit,
        });
        console.log("LOG: Assignment to edit:");
        console.log(assignToEdit);
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
    let updateAssign = Assign({
        "_id": id,
        "name":req.body.name,
        "author":req.body.author,
        "published":req.body.published,
        "description":req.body.description,
        "price":req.body.price,
    })
    console.log("Post");
    console.log(updateAssign);
    Assign.updateOne({_id: id}, updateAssign)
    .then(() => {
        res.redirect('/list');
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
    Assign.deleteOne({_id: id}).then(() => {
        res.redirect('/list');
    })
    .catch((err) => {
        console.log(err);
        console.log("Delete error! :(");
        res.send(err);
    })
});


module.exports = router; /*Please do not delete me :(*/