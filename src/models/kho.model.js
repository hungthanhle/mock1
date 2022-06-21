const {sequelize} = require('../config/config.js');
const { Sequelize, DataTypes } = require('sequelize');
const pool = new Sequelize(sequelize.database, sequelize.username, sequelize.password, {
    host: sequelize.host,
    dialect: sequelize.dialect
});
var schemaName ='mock';
const QuestTableName = 'quest_kho';
const AnsTableName = 'ans_kho';
const quest_kho = pool.define('quest_kho', {
    quest_kho_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement:true,
      primaryKey: true,
    },
    created_id: {
        type: DataTypes.INTEGER
    },
    quest_kho_content: {
        type: DataTypes.STRING
    },
},{
    timestamps: false,
    schema: schemaName,
    tableName: QuestTableName,
});
quest_kho.sync();
const ans_kho = pool.define('ans_kho', {
    ans_kho_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement:true,
      primaryKey: true,
    },
    quest_kho_id: {
        type: DataTypes.INTEGER
    },
    created_id: {
        type: DataTypes.INTEGER
    },
    ans_kho_content: {
        type: DataTypes.STRING
    },
    iscorrect: {
        type: DataTypes.BOOLEAN
    },
},{
    timestamps: false,
    schema: schemaName,
    tableName: AnsTableName,
});
ans_kho.sync();
module.exports = {
    pool,
    quest_kho,
    ans_kho,
};