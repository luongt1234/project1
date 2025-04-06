const express = require('express')
const { login, signUp, signUpUser, loginAcc, homePage } = require('../controllers/controllers')
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/auth');
const { refreshToken } = require('../controllers/athu');
require('dotenv').config();

router.get('/login', login);
router.get('/signUp', signUp);

router.post('/signUpUser', signUpUser);
router.post('/loginAcc', loginAcc);
router.get('/homePage', homePage);

// router.get('/posts', verifyToken, (req, res) => {
//     console.log(req.headers.authorization);
//     res.json({posts : 'my posts'});
// });

router.get("/token", refreshToken);
const FILES_DIR = path.join(__dirname, 'filesUser');

// Serve file tĩnh (cho phép download trực tiếp)
// app.use('/files', express.static(FILES_DIR));

// Trang chủ: hiển thị danh sách file
app.get('/', verifyToken, (req, res) => {
    const filePath = path.join(FILES_DIR, fileName);
    fs.readdir(filePath, (err, files) => {
        if (err) return res.status(500).send('Không thể đọc thư mục');

        const fileListHtml = files.map(file => {
            const fileUrl = `/files/${encodeURIComponent(file)}`;
            return `<li><a href="${fileUrl}" download>${file}</a></li>`;
        }).join('');

        res.send(`
      <h1>Chia sẻ file</h1>
      <ul>${fileListHtml}</ul>
    `);
    });
});


module.exports = router;