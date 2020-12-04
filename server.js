const cookieParser = require('cookie-parser'); //for write & read cookies
const csrf = require('csurf'); //to prevent us from CSRF(cross site request frogery) attacks
const bodyParser = require('body-parser');
const express = require('express');

//check to find the require cookies in each request
const csrfMiddleware = csrf({cookie:true});
const PORT = process.env.PORT || 5000;
const app = express();

//parse post request from the frontend
app.use(bodyParser.json());
app.use(cookieParser());
//sets & checks csrf related cookies 
app.use(csrfMiddleware);

app.engine("html", require('ejs').renderFile);
app.use(express.static('static'));

app.all('*' , (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
next();
});

app.get('/login', (req,res) => {
res.render('signup.html');
});

app.get('/profile',(req,res) => {
res.render('profile.html');
})

app.get("/", (req,res)=>{
res.render("index.html")
});

app.listen(PORT,()=>{
console.log(`App is running on http://localhost:${PORT}`);
});

