const express = require('express')
const controller = require('../controllers/athu')
const router = express.Router();
const {verifyToken} = require('../middleware/auth')
require('dotenv').config();


router.post("/token", controller.refreshToken);
router.post('/login1',controller.login);

module.exports = router;