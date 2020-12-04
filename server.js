const cookieParser = require("cookie-parser");
const csurf = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");

const csrfMiddleware = csurf({cookie:true});
const PORT = process.env.PORT || 5000;
const app = express();


app.engine("html", require('ejs').renderFile);
app.use(express.static('static'));

app.all("*" , (req,res,next) => {
//res.cookie("XSRF-TOKEN", req.csrfToken());
next();
});


app.get("/", (req,res)=>{
res.render("index.html")
});

app.listen(PORT,()=>{
console.log(`App is running on http://localhost:${PORT}`);
});

