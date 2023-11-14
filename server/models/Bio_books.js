let mongoose = require('mongoose');

// create a model class
let schema = new mongoose.Schema({
    name: {type: String,},
    author:{type: String,},
    published: {type: String,},
    description: {type: String,},
    price: {type: String,},
},
);
module.exports = mongoose.model('book', schema, "books");
