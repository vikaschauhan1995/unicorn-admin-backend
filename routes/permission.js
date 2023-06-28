const express = require('express');
const { getAllPermissions } = require('../controllers/permissionController');

const router = express.Router();


// provide all permissions
router.get('/all', getAllPermissions);


module.exports = router;