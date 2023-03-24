const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB).then(() => console.log("DATABASE CONNECTED ...")).catch(() => console.log("DATABASE DOESN,T CONNECTED"));