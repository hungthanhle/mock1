const express = require('express');
const router = express.Router();

const deRoute = require('./de.route.js');
const authRoute = require('./auth.route.js');
const khoRoute = require('./kho.route.js');
const bailamRoute = require('./bailam.route.js');
const docsRoute = require('./docs.route');

const defaultRoutes = [
    {
      path: '/',
      route: authRoute,
    },
    {
      path: '/de',
      route: deRoute,
    },
    {
      path: '/kho',
      route: khoRoute,
    },
    {
      path: '/bailam',
      route: bailamRoute,
    },
    {
      path: '/docs',
      route: docsRoute,
    },
];
defaultRoutes.forEach((arr) => {
    router.use(arr.path, arr.route);
});

module.exports = router;