const express = require('express');
const path = require('path');
const routes = require('./routes');
const cookieParser = require('cookie-parser'); //for write & read cookies
const csrf = require('csurf'); //to prevent us from CSRF(cross site request frogery) attacks
const bodyParser = require('body-parser');

//check to find the require cookies in each request
const csrfMiddleware = csrf({cookie:true});
const PORT = process.env.PORT || 5000;
const app = express();

//parse post request from the frontend
app.use(bodyParser.json());
app.use(cookieParser());
//sets & checks csrf related cookies 
app.use(csrfMiddleware);

//app.engine("html", require('ejs').renderFile);
//app.use(express.static('static'));
app.set('view engine','ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './static')));

app.locals.siteName = 'Firebase Sample Authentication App';

app.all('*' , (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
next();
});

app.use('/',routes());

app.listen(PORT,()=>{
console.log(`App is running on http://localhost:${PORT}`);
});

