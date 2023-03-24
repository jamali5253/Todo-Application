const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const SECKEY =' HIMYNAMEISMUHAMMADULBAKIRANDIMAAFULLSTACKDEVELOPER'
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 2,
        required: true
    },
    email: {
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Sorry Your email is incorrect")
            } else {
                console.log("EMAIL IS VALID ....");
            }
        },
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
               
            }
        }
    ],
    todos: [
        {
            tododata: {
                type : String
            }
        }
    ]

});
userSchema.pre('save', async function (next) {
    console.log("PASSWORD BCRYPT RUNNING ....");
    if (this.isModified) {
       this.pass = await bcrypt.hash(this.pass , 12) 
    } next()
});
userSchema.methods.generateAuthToken = async function () {
    console.log("TOKEN RUNNING ....");
    const token = jwt.sign({ _id: this._id },SECKEY);
    this.tokens = this.tokens.concat({ token: token });
    this.save();
    return token;
}
const Model1 = mongoose.model('Todo-datas', userSchema);
module.exports = Model1