const express = require('express');

const router = express.Router();

const { loginUser, signupUser, createSubuser, getSubusers, deleteSubuser } = require('../controllers/userController');

// login
router.post('/login', loginUser);


// signup
router.post('/signup', signupUser);

// create subuser
router.post('/subuser', createSubuser);
router.get('/subusers/:user_id', getSubusers);
router.delete('/subuser/:user_id', deleteSubuser);

module.exports = router;