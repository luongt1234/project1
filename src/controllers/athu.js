const dp = require('../services/CRUDservice');
const jwt = require("jsonwebtoken");

const refreshToken = (req, res) => {

    const refreshToken = req.body.refreshToken;

    if (!refreshToken) return res.sendStatus(401);

    const user = Users.find(user => user.refreshToken === refreshToken);
    if (!user) return res.sendStatus(403);
    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const tokens = generateToken(user);
        updaterRefreshToken(user.username, tokens.refreshToken);
        res.json({ tokens })
    } catch (error) {
        console.log(error);

    }
}

const generateToken = payload => {
    const {id, username} = payload;
    const accToken = jwt.sign({id, username}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15s'
    });
    const accTokenRefresh = jwt.sign({id, username}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1h'
    })
    return { accToken, accTokenRefresh };
    // const accToken = jwt.sign({id, username}, process.env.ACCESS_TOKEN_SECRET);
    // return {accToken}
}

const updaterRefreshToken = async (username, refreshToken) => {
    try {
        await dp.updateRefreshToken(username, refreshToken);
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await dp.checkUser(username, password);
    if (user.length === 0) return res.sendStatus(401);
    // console.log(process.env.ACCESS_TOKEN_SECRET);

    const tokens = generateToken(user);
    updaterRefreshToken(username, tokens.accTokenRefresh);
    // console.log(user);
    return res.json(tokens);
}

module.exports = {
    refreshToken,login
}