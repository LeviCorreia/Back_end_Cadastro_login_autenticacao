const Sequelize = require("sequelize")

//Conexão com o DB MYSQL

const sequelize = new Sequelize('scom', 'root', 'Colocar_sua_senha_do+Mysql', { 
    host: "localhost",
    dialect: 'mysql',
})

sequelize.authenticate().then(() => console.log("Conectado ao banco de dados!")).catch(err => console.log("Falha ao se conectar: " + err))

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}