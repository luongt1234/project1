require('dotenv').config();

const express = require('express');
const configViewEngine = require('./config/viewEngine');
const webRouter = require('./routes/web');

const app = express();
const port = process.env.PORT || 3000;
const hostName = process.env.HOSTNAME;


//config view engine
configViewEngine(app);

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/', webRouter);

app.listen(port, hostName, () => {
    console.log(`Server is running on http://localhost:${port}`);
})