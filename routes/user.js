const express = require('express');

const router = express.Router();

const { loginUser, signupUser, createSubuser, getSubusers, getAllSubusers } = require('../controllers/userController');

// login
router.post('/login', loginUser);


// signup
router.post('/signup', signupUser);

// create subuser
router.post('/subuser', createSubuser);
router.get('/subusers/:_id', getSubusers);

module.exports = router;