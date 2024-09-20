const mysql = require('mysql2'); // Importa o módulo mysql2 para trabalhar com MySQL

const dbConnection = mysql.createConnection({
  host: 'localhost', // Endereço do servidor MySQL
  port: 3306, // Porta do servidor MySQL
  user: 'root', // Nome de usuário para autenticação no MySQL
  password: 'admin' // Senha para autenticação no MySQL
});

dbConnection.connect((err) => {
  if (err) throw err; // Lança um erro caso a conexão não seja bem-sucedida
  console.log('Database connected!'); // Exibe uma mensagem de sucesso caso a conexão seja bem-sucedida
});

module.exports = dbConnection; // Exporta a conexão com o banco de dados para ser utilizada em outros módulos
