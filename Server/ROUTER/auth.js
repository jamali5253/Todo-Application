// require Section ....
const express = require('express');
const cors = require("cors");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const Model1 = require("../DATABASE--COLLECTION/collection1");
const Model2 = require("../DATABASE--COLLECTION/collection2");
const router = express.Router();
const bcrypt = require('bcrypt');
let token;
require("../DATABASE--CONNECTION/dbconnection");
//---------------------------------------
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(express(cors));
router.use(cookieparser());
//----------------------------------------
// register Section --------\
router.post("/api/register", async (req, res) => {
    const { username, email, pass, cpass } = req.body;
    if (!username || !email || !pass || !cpass) {
        req.json({err : "Some of Fields are not filled"})
    }
    if (pass === cpass) {
        const ismatch = await Model1.findOne({ email: email,} , {pass : pass});
        if (ismatch) {
            res.json({ err: "Data Already Valid" })
            console.log(`DATA ALREADY VALID !!!`);
        } else {
            const newuser = new Model1({
                username, email, pass
            });
            const save_new_users = await newuser.save();
            res.json(save_new_users);
            console.log(save_new_users);
            console.log("--------------- NEW USER REGISTERED SUCCESSFULLY ---------------");
        }
   }
});
// User Login Section ----------\
router.post("/api/login", async (req, res) => {
    const { email, pass } = req.body;
    const match1 = await Model1.findOne({ email: email });
    if (match1) {
        console.log("User email verified");
        const match2 = bcrypt.compare(pass, match1.pass);
        if (match2) {
             token = await match1.generateAuthToken();
            console.log(`---------------------- ${match1.username} LOGIN SUCCESSFULLY ------------------- `);
            console.log(`Token ----> ${token}`);
            res.json({
                userdata: match1, // When user Signin Its data and current token becomes goes to fronted to set cookie .
                usertoken : token // Also token identifies that the user is authenticate or not .
            })
        }
    }
})
//--------------------------------------------------------
// Check that if user is login or not

router.post("/api/checkuser" , async (req, res) => {
    res.json(req.finduser);
});
//------------------------------------------------------------
router.get("/api/todo", async (req, res) => {
    const token = req.cookies.authtoken;
    if (token) {
        const ismatch = await Model1.findOne({ 'tokens.token': token });
        if (ismatch) {
            res.json(ismatch)
        } else {
            res.status(401).json({err : "Token does not match"})
        }
    }
    
})
//-------------------------------------------------------
// ----------------------------------------- THIS IS TODO SECTION -------------------------------------------------
router.post("/api/create/:id", async (req, res) => {
    const { data } = req.body;
    const userid = req.params.id;
    console.log(data);
    //----------------------
    try {
        const match = await Model2.findOne({ tododata : data });
        if (match) {
            res.json("Data Already Valid")
        } else {
            const newdata = new Model2({
                userid:userid ,
                tododata:data
            });
            const ndata = await newdata.save();
            res.json(ndata);
            console.log(ndata);
        }
    } catch (error) {
        res.status(401).json({err : "There is some error inside"})
    }
  
});
//-------------------------------------------------
// Fetch All Data ;
router.get("/api/read/:id", async (req, res) => {
    const userid = req.params.id;
    try {
        const finddata = await Model2.find({ userid: userid });
        res.json(finddata);
    } catch (error) {
        res.status(401).json({err : "There is some error in backend "})
    }
})

router.post("/api/delete/:tododata", async (req, res) => {
    const tdata = req.params.tododata;
    const usrid = req.body.userid
    console.log(tdata);
    const ismatch = await Model2.find({ $and: [{ userid: usrid }, { tododata: { $ne: tdata } }] });
    console.log(ismatch.userid);
    res.json(ismatch);
});


router.delete("/api/duser/:tododata", async (req, res) => {
    const userdata = req.params.tododata;
    try {
        const finddata = await Model2.deleteOne({ tododata: userdata },);
        console.log(finddata);
    } catch (error) {
        res.status(401).json({ err: "There is some error in backend " })
    }
});

router.post("/api/update/:tododata", async (req, res) => {
    const userdata = req.params.tododata;
    const updatedata = req.body.updated;
    try {
        const match = await Model2.findOneAndUpdate({ tododata: userdata }, { $set: { tododata: updatedata } } , {new : true});
        res.json(match);
        console.log(match.tododata);
    } catch (error) {
        res.json({err : "There is some err inside the code"})
    }
})

// export Section 
module.exports = router;