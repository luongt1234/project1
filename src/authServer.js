require('dotenv').config();
const jwt = require("jsonwebtoken");
const express = require('express');
// const {verifyTokenRefresh} = require("./middleware/auth");
// const configViewEngine = require('./config/viewEngine');
// const webRouter = require('./routes/web');


let Users = [
    {
        id: 1,
        username: 'luong',
        refreshToken: null
    }
]

const app = express();
const port = process.env.PORT_AUTH || 5000;
const hostName = process.env.HOSTNAME;


//config view engine
// configViewEngine(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', webRouter);
app.use(express.static('public'));

app.post("/token", (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) return res.sendStatus(401);

    const user = Users.find(user => user.refreshToken === refreshToken);
    if (!user) return res.sendStatus(403);
    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        
        const tokens = generateToken(user);
        updaterRefreshToken(user.username, tokens.refreshToken);
        res.json({tokens})
    } catch (error) {
        console.log(error);
    }
});

const generateToken = payload => {
    const {id, username} = payload;
    const accToken = jwt.sign({id, username}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15s'
    });

    const accTokenRefresh = jwt.sign({id, username}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1h'
    })
    return { accToken, accTokenRefresh };
}

const updaterRefreshToken = (username, refreshToken) => {
    
    Users = Users.map(user => {
        if (user.username === username) {
            return {
                ...user,
                refreshToken
            }
        }
        return user;
    });
}

app.post('/login1', (req, res) => {
    const username = req.body.username;
    const user = Users.find(user => user.username === username);
    if (!user) return res.sendStatus(401);

    // console.log(process.env.ACCESS_TOKEN_SECRET);

    const tokens = generateToken(user);
    updaterRefreshToken(username, tokens.accTokenRefresh);
    console.log(Users);
    return res.json(tokens);
});

app.listen(port, hostName, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

