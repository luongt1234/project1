const jwt = require('jsonwebtoken');
require('dotenv').config()


const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log(decode);

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

// const verifyTokenRefresh = (req, res, next) => {
//     const authHeader = req.header('Authorization');
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) return res.sendStatus(401);

//     try {
//         const decode = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
//         // console.log(decode);

//         next();
//     } catch (error) {
//         console.log(error);
//         return res.sendStatus(400);
//     }
// }

module.exports = {
    verifyToken
}