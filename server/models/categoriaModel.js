const dbConnection = require("../db/dbConnection.js"); // Importa o módulo de conexão com o banco de dados

class CategoriaModel {
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

  // Retorna uma categoria baseada no gênero especificado
  read(genero) {
    const sql = "SELECT * FROM categorias WHERE genero = ?";
    return this.executeSQL(sql, genero);
  }

  // Retorna todas as categorias
  readAll() {
    const sql = "SELECT * FROM categorias";
    return this.executeSQL(sql);
  }

  // Cria uma nova categoria
  create(newCategoria) {
    const sql = "INSERT INTO categorias (nome, genero) VALUES (?, ?)";
    const values = [newCategoria.nome, newCategoria.genero];
    return this.executeSQL(sql, values);
  }

  // Atualiza uma categoria existente baseada no ID
  update(updatedCategoria, id) {
    const sql = "UPDATE categorias SET nome = ?, genero = ? WHERE id = ?";
    const values = [updatedCategoria.nome, updatedCategoria.genero, id];
    return this.executeSQL(sql, values);
  }

  // Deleta uma categoria baseada no ID
  delete(id) {
    const sql = "DELETE FROM categorias WHERE id = ?";
    return this.executeSQL(sql, id);
  }
}

module.exports = new CategoriaModel(); // Exporta uma instância única da classe CategoriaModel
