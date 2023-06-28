const express = require('express');

const router = express.Router();

const { loginUser, signupUser, createSubuser } = require('../controllers/userController');

// login
router.post('/login', loginUser);


// signup
router.post('/signup', signupUser);

// create subuser
router.post('/subuser', createSubuser);

module.exports = router;