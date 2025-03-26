const { createUser, checkUser } = require('../services/CRUDservice');
const notifier = require('node-notifier');
const axios = require('axios'); // Thư viện gọi API
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
    console.log(req.body)
    try {
        const response = await axios.post('http://localhost:8000/login1', req.body);
        res.json(response.data); // Trả token về cho client
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'Lỗi đăng nhập' });
    }
}

module.exports = {
    login, signUp, signUpUser, loginAcc
}