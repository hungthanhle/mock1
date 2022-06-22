const {sequelize} = require('../config/config.js');
const { Sequelize, DataTypes } = require('sequelize');
const pool = new Sequelize(sequelize.database, sequelize.username, sequelize.password, {
    host: sequelize.host,
    dialect: sequelize.dialect
});
var schemaName ='mock';
const TokenTableName = 'token';
const Token = pool.define('token',
  {
    token: {
      type: DataTypes.STRING,
      required: true,
      index: true,
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: true,
    schema: schemaName,
    tableName: TokenTableName,
  }
);

Token.sync();

module.exports = Token;