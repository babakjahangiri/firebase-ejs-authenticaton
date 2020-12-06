const express = require('express');
const router = express.Router();

const {firebase_auth} = require("../firebaseService")

module.exports = () => {

  router.get('/', async (req,res) => {
    return res.render('layout', {
      pageTitle : 'Welcome',
      template : 'index'
    });
  })

  router.get('/login', async (req,res) => {
    return res.render('layout', {
      pageTitle : 'Login',
      template : 'login'
    });
  })

  router.get('/profile', async (req,res) => {
    const sessionCookie = req.cookies.session || "";
    
    firebase_auth().verifySessionCookie(sessionCookie, true /**checkRevoked */)
     .then(()=> {
      return res.render('layout', {
        pageTitle : 'User Profile',
        template : 'profile'
      });
     })

      .catch((error) => {
        res.redirect("/login");
     });
  });

  router.get('/signup', async (req,res) => {
    return res.render('layout', {
      pageTitle : 'signup',
      template : 'signup'
    });
  });

  router.post("/sessionLogin", (req, res) => {
    const idToken = req.body.idToken.toString();
  
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
  
    firebase_auth()
      .createSessionCookie(idToken, { expiresIn })
      .then(
        (sessionCookie) => {
          const options = { maxAge: expiresIn, httpOnly: true };
          res.cookie("session", sessionCookie, options);
          res.end(JSON.stringify({ status: "success" }));
        },
        (error) => {
          res.status(401).send("UNAUTHORIZED REQUEST!");
        }
      );
  });

  router.get("/sessionLogout", (req, res) => {
    res.clearCookie("session");
    res.redirect("/login");
  });

  
  return router;

};

