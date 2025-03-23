const express = require('express')
const {login} = require('../controllers/controllers')
const router = express.Router();

router.get('/', login);

module.exports = router;