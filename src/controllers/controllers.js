const { createUser, checkUser } = require('../services/CRUDservice');
const notifier = require('node-notifier');
const axios = require('axios'); // Thư viện gọi API
const cookie = require('cookie-parser');
// var popupS = require('popups');
// let alert = require('alert');

const login = (req, res) => {
    res.render('login.ejs');
}

const signUp = (req, res) => {
    res.render('signUp.ejs');
}

const signUpUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userCreated = await createUser(username, password);

        if (userCreated) {
            notifier.notify({
                title: 'Signup',
                message: 'Successful'
            });
            res.redirect('/login');

        } else {
            notifier.notify({
                title: 'Signup Error',
                message: 'Account already exists'
            });
            // res.status(409).send('Account already exists');
            res.status(204).end();
        }
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).send('Internal Server Error');
    }
}

const loginAcc = async (req, res) => {
    // console.log(req.body)
    try {
        const response = await axios.post('http://localhost:8000/login1', req.body);
        res.json(response.data); // Trả token về cho client
        res.cookie('token', response.token, {
            httpOnly: true,
            secure: false,        // Bật true nếu dùng HTTPS
            sameSite: 'Strict',
            maxAge: 3600000        // 1 giờ
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'Lỗi đăng nhập' });
    }
}

const homePage = (req, res) => {
    console.log(req.header('Authorization'));
    res.render('homePage.ejs');
}

const refreshToken = async (req, res) => {
    const response = await axios.post('http://localhost:8000/token', req.body);
    if (response.token) {
        res.cookie('token', response.token, {
            httpOnly: true,
            secure: false,        // Bật true nếu dùng HTTPS
            sameSite: 'Strict',
            maxAge: 3600000        // 1 giờ
        });
    }
}

module.exports = {
    login, signUp, signUpUser, loginAcc, homePage
}