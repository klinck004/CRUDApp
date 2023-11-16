/*CRUD route file*/
let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();

let Assign = require('../models/assignment'); /* use Assignment model defined in models folder */
console.log("Assignment DB controller loaded!"); /* for dev peace of mind */

/*Read*/
module.exports.displayList = async (req,res,next)=>{ 
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
 };

/*Create */
/*Get route*/
module.exports.displayCreate = async (req,res,next)=>{ 
    res.render('CRUD/add', {
        title: 'Add New Assignment', 
    })
};

/*Post route*/
module.exports.runCreate = async (req,res,next)=>{ 
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
};

/*Update*/
/*Get route*/
module.exports.displayUpdate = async (req,res,next)=>{ 
    try{
    
        let id = req.params.id;
        let assignToEdit = await Assign.findById(id)
        res.render('CRUD/edit', {
            nameAssign: assignToEdit.name,
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

/*Post route*/
module.exports.runUpdate= async (req,res,next)=>{ 
    let id=req.params.id;
    let updateAssign = Assign({
        "_id": id,
        "name":req.body.name,
        "class":req.body.class,
        "due":req.body.due,
        "notes":req.body.notes,
        "mark":req.body.mark,
        "weight":req.body.weight,
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
}

/*Delete*/
/*Get route*/
module.exports.runDelete = async (req,res,next)=>{ 
    let id = req.params.id;
    Assign.deleteOne({_id: id}).then(() => {
        res.redirect('/list');
    })
    .catch((err) => {
        console.log(err);
        console.log("Delete error! :(");
        res.send(err);
    })
}

/*View single item*/
/*Get route*/
module.exports.displayShow = async (req,res,next)=>{ 
    try{
        let id = req.params.id;
        console.log("Show GET:");
        console.log(id);
        const assignToShow = await Assign.findById(id)
        res.render('CRUD/show', {
           title: 'View Assignment', 
           id: id,
           assignToShow: assignToShow,
        });
     }catch(err){
        console.error(err);
        console.log("Show error! :(");
        res.render('CRUD/edit', {
           error: 'Error on server'
           
        });
     }
}

/*Post notes update*/
module.exports.runShow = async (req,res,next)=>{ 
    let id=req.params.id;
    console.log("Show POST:");
    console.log(req.body)
    console.log(id);
    let updateAssign = Assign({
        "_id": id,
        "name":req.body.name,
        "class":req.body.class,
        "due":req.body.due,
        "notes":req.body.notes,
        "mark":req.body.mark,
        "weight":req.body.weight,
    })
    
    Assign.updateOne({_id: id}, updateAssign)
    .then(() => {
        res.redirect('/list/show/' + id);
    })
    .catch((err) => {
        console.log(err);
        console.log("Show view edit error! :(");
        res.send(err);
    });
}
