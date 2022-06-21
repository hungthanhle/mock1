const config = require('../config/config');

var swaggerDef = {
        openapi: '3.0.0',
        info: {
          title: 'Bài kiểm tra',
          version: '1.0.0',
        },
        servers: [
          {
            url: `http://localhost:${config.port}/api`,
          },
        ],
};

module.exports = swaggerDef;