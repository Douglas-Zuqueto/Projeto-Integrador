// Importação das conexões e inicialização do banco de dados

// Importa o módulo de conexão com o banco de dados do arquivo './dbConnection.js'
const dbConnection = require("./dbConnection.js");

// Importa o módulo de inicialização do banco de dados do arquivo './dbCreate.js'
const db = require("./dbCreate.js");

// Exporta a inicialização da conexão com o banco de dados, usando a conexão 'dbConnection'
module.exports = db.initConnection(dbConnection);
