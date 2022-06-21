const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    env: process.env.NODE_EVN,
    port: process.env.PORT,
    jwt: {
        secret: process.env.JWT_SECRET,
        accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    },
    sequelize: {
      database: process.env.PG_DATABASE,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      host: process.env.PG_HOST,
      dialect: process.env.PG_DIALECT,
    },
};