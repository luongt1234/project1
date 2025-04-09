const express = require('express')
const { login, signUp, signUpUser, loginAcc, homePage, logout} = require('../controllers/controllers')
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/auth');
const { refreshToken } = require('../controllers/athu');
require('dotenv').config();

router.get('/login', login);
router.get('/signUp', signUp);

router.post('/signUpUser', signUpUser);
router.post('/loginAcc', loginAcc);
router.get('/', homePage);

// router.get('/posts', verifyToken, (req, res) => {
//     console.log(req.headers.authorization);
//     res.json({posts : 'my posts'});
// });

router.get("/token", refreshToken);
// const FILES_DIR = path.join(__dirname, 'filesUser');

// Serve file tĩnh (cho phép download trực tiếp)
// app.use('/files', express.static(FILES_DIR));

// Trang chủ: hiển thị danh sách file

router.get('/logout', logout);

module.exports = router;