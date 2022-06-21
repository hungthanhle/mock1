const express = require('express');
const app = express();
const routes = require('./src/routes');

// Đăng nhập & JWT
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());

app.use("/api",routes);

module.exports = app;
