const {sequelize} = require('../config/config.js');
const { Sequelize, DataTypes } = require('sequelize');
const pool = new Sequelize(sequelize.database, sequelize.username, sequelize.password, {
    host: sequelize.host,
    dialect: sequelize.dialect
});
var schemaName ='mock';
const deName = 'de';
const phatdeName = 'quest_thongke';
const de = pool.define('de', {
    de_so: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement:true,
      primaryKey: true,
    },
    mo_ta_de:{
        type: DataTypes.STRING
    },
    created_id: {
        type: DataTypes.INTEGER
    },
    time_start: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    time_end: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
},{
    timestamps: false,
    schema: schemaName,
    tableName: deName,
});
de.sync();

const quest_thongke = pool.define('quest_thongke', {
    ma_cau_hoi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement:true,
      primaryKey: true,
    },
    de_so: {
        type: DataTypes.INTEGER
    },
    quest_kho_id: {
        type: DataTypes.INTEGER
    },
},{
    timestamps: false,
    schema: schemaName,
    tableName: phatdeName,
});
quest_thongke.sync();

module.exports = {
    pool,
    de,
    quest_thongke,
};