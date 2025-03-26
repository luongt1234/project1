const express = require('express')
const {login, signUp, signUpUser, loginAcc, homePage} = require('../controllers/controllers')
const router = express.Router();
const jwt = require('jsonwebtoken');
const {verifyToken} = require('../middleware/auth')
require('dotenv').config();

router.get('/login', login);
router.get('/signUp', signUp);

router.post('/signUpUser', signUpUser);
router.post('/loginAcc', loginAcc);
router.get('/', homePage);

router.get('/posts', verifyToken, (req, res) => {
    console.log(req.headers.authorization);
    res.json({posts : 'my posts'});
});



module.exports = router;