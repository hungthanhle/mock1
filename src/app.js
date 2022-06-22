const express = require('express');
const app = express();
const routes = require('./routes');

const { jwtStrategy } = require('./config/passport');
const passport = require('passport');
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use(express.json());

app.use("/api",routes);

module.exports = app;
