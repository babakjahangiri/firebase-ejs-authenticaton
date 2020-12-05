const express = require('express');
const router = express.Router();

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
    return res.render('layout', {
      pageTitle : 'User Profile',
      template : 'profile'
    });
  })

  router.get('/signup', async (req,res) => {
    return res.render('layout', {
      pageTitle : 'signup',
      template : 'signup'
    });
  })

  return router;

};

