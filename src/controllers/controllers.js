const { createUser, checkUser } = require('../services/CRUDservice');
const notifier = require('node-notifier');
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

module.exports = {
    login, signUp, signUpUser
}