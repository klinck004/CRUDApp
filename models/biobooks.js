let mongoose = require("mongoose");
const Schema = mongoose.Schema;

let bookModel = new Schema({
    name:String,
    author:String,
    published:String,
    description:String,
    price:Number,
},
{
    collection:"biobooks"    
});

module.exports = mongoose.model("Book", bookModel);