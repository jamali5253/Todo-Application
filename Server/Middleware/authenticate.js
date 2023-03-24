const Model1 = require("../DATABASE--COLLECTION/collection1");
const jwt = require("jsonwebtoken");
//------------------------
const authenticate = async (req, res, next) => {
    const token1 = req.cookies.authtoken;
    try {
        const verifytoken = jwt.verify(token1, process.env.SECKEY)
        console.log(`This is Frontend Token --->   ${token1} `);
        const finduser = await Model1.findOne({ _id: verifytoken._id, 'tokens.token': token1 });
        console.log(finduser.username);
        req.finduser = finduser;
        next();
    } catch (error) {
        res.json({ err: "not token" });
    }
};
module.exports = authenticate;