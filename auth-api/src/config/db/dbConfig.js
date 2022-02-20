//import Sequelize from "sequelize"
const Sequelize = require('sequelize')

const sequelize = new Sequelize("auth-db", "admin", "123456", {
    host: "192.168.0.13",
    port: 5432,
    dialect: "postgres",
    quoteIdentifiers: false,
    define: {
        syncOnAssociation: true,
        timestamps: false,
        underscored: true,
        underscoredAll: true,
        freezeTableName: true
    },
});

sequelize
.authenticate()
.then(() => {
    console.info("Conexao foi estabelecida");
})
.catch((err) => {
    console.error(err.message);
});

module.exports = sequelize;
