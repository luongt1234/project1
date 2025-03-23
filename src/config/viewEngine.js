const path = require('path');
const express = require('express');

const configViewEngine = (app) => {
    app.set('view engine', 'ejs');
    app.set('views', './src/views');
    //config static files
    app.use(express.static(path.join("./src", 'public')));
}

module.exports = configViewEngine;