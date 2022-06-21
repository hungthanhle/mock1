const {sequelize} = require('../config/config.js');
const { Sequelize, DataTypes } = require('sequelize');
const pool = new Sequelize(sequelize.database, sequelize.username, sequelize.password, {
    host: sequelize.host,
    dialect: sequelize.dialect
});
var schemaName ='mock';
const tableName = 'users';
const User = pool.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
      },
    role: {
        type: DataTypes.STRING
    },
},{
    timestamps: false,
    schema: schemaName,
    tableName: tableName,
});
User.sync();

module.exports = User;