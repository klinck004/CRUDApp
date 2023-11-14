const config = require('./config.js');
const mongoose = require('mongoose');

module.exports = function() {
    const db = mongoose.connect(config.db);
    require("../models/biobooks.js");
return db;
};