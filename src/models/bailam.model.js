const {sequelize} = require('../config/config.js');
const { Sequelize, DataTypes } = require('sequelize');
const pool = new Sequelize(sequelize.database, sequelize.username, sequelize.password, {
    host: sequelize.host,
    dialect: sequelize.dialect
});
var schemaName ='mock';
const nopTableName = 'ans_thongke';
const ans_thongke = pool.define('ans_thongke', {
    ma_tra_loi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement:true,
      primaryKey: true,
    },
    user_id: {type: DataTypes.INTEGER},
    de_so: {type: DataTypes.INTEGER},
    quest_kho_id: {type: DataTypes.INTEGER},
    ans_kho_id: {type: DataTypes.INTEGER},
    created_id: {type: DataTypes.INTEGER},
    time_start: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    time_end: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    ans_cham: {type: DataTypes.BOOLEAN},
},{
    timestamps: false,
    schema: schemaName,
    tableName: nopTableName,
});
ans_thongke.sync();

module.exports = {
    pool,
    ans_thongke,
};