// Require Section 
const express = require('express');
const dotenv = require("dotenv");
//----------------------------------
const app = express();
dotenv.config({ path: "./config.env" });
const port = process.env.PORT;
//--------------------------------
app.use(require("../ROUTER/auth"));
//--------------------------------
app.listen(port , (() => console.log(`LISTNING TO THE PORT ${port} ...`)))