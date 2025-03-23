const express = require('express')
const {login, signUp, signUpUser} = require('../controllers/controllers')
const router = express.Router();
const jwt = require('jsonwebtoken');
const {verifyToken} = require('../middleware/auth')
require('dotenv').config();

router.get('/login', login);
router.get('/signUp', signUp);
router.post('/signUpUser', signUpUser);



router.get('/posts', verifyToken, (req, res) => {
    res.json({posts : 'my posts'});
});



module.exports = router;