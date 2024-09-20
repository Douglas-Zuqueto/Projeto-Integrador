const dbConnection = require('../db/dbConnection.js'); // Importa o módulo de conexão com o banco de dados

class UserModel {
  // Método genérico para executar consultas SQL
  executeSQL(sql, parameters = "") {
    return new Promise((resolve, reject) => {
      // Utiliza a conexão com o banco de dados para executar a consulta
      dbConnection.query(sql, parameters, (error, response) => {
        if (error) {
          return reject(error); // Rejeita a Promise se houver erro
        }
        return resolve(response); // Resolve a Promise com os dados da consulta
      });
    });
  }

  getUserById(id) {
    const sql = "SELECT * FROM users WHERE id = ?";
    return this.executeSQL(sql, id);
  }
  
}

module.exports = new UserModel();