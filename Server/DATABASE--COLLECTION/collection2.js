const mongoose = require("mongoose");
const NewSchema2 = new mongoose.Schema({
    userid: {
        type : String
    },
    tododata: {
        type : String
    }
    
});
const Model2 = mongoose.model('T-DATA', NewSchema2);
module.exports = Model2;