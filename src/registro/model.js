const db = require('../../src/configs/sequelize');
const { Model, DataTypes } = db.Sequelize;
const sequelize = db.sequelize;

class Registro extends Model { }

Registro.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    dat_Nasc: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    tel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profissao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    escolaridade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    habilidade: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, { sequelize, modelName: 'cadastros' })

module.exports = Registro;