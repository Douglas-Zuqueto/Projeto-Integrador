const dbConnection = require('../db/dbConnection.js'); // Importa o módulo de conexão com o banco de dados

class UsernewUserModel {
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

  // Retorna todos os usuários cadastrados
  readList() {
    const sql = "SELECT * FROM users";
    return this.executeSQL(sql);
  }

  // Retorna um usuário baseado no ID
  read(id) {
    const sql = "SELECT * FROM users WHERE id = ?";
    return this.executeSQL(sql, id);
  }

  // Cria um novo usuário na tabela 'users'
  create(newUser) {
    const sql = "INSERT INTO users (id, nome) VALUES (?, ?)";
    const values = [newUser.id, newUser.nome];
    return this.executeSQL(sql, values);
  }

  // Atualiza os dados de um usuário baseado no ID
  update(updatedUser, id) {
    const sql = "UPDATE User SET id = ?, nome = ? WHERE id = ?";
    const values = [updatedUser.id, updatedUser.nome, updatedUser.email, id];
    return this.executeSQL(sql, values);
  }

  // Deleta um usuário da tabela 'users' baseado no ID
  delete(id) {
    const sql = "DELETE FROM users WHERE id = ?";
    return this.executeSQL(sql, id);
  }
}

module.exports = new UsernewUserModel(); // Exporta uma instância única da classe UsernewUserModel
