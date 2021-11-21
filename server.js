if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); //parse and load not working yet to see TODO
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const indexRender = require("./routes/index"); // index.js
app.set("view engine", "ejs"); // set up ejs for templating
app.set("views", __dirname + "/views"); //  __dirname is the current directory
app.set("layout", "layouts/layout"); // set layout
app.use(expressLayouts); // use the layout
app.use(express.static("public"));

//connection Database

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.use("/", indexRender); // use the index.js

app.listen(process.env.PORT || 3000); // process.env.PORT is Heroku's port if you choose to deploy on Heroku
