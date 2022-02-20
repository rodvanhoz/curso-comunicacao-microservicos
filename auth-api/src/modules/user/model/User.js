//import Sequelize from "sequelize";
//import sequelize from "../../../config/db/dbConfig";

const Sequelize = require('sequelize')
const sequelize = require('../../../config/db/dbConfig')

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},
    {}
);

module.exports = User;