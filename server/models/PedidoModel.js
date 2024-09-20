const dbConnection = require("../db/dbConnection.js"); // Importa o módulo de conexão com o banco de dados

class PedidoModel {
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

  // Cria uma nova Pedido
  create(newPedido) {
    const sql = "INSERT INTO pedidos (nome, email, endereco, cidade, estado, cep, telefone) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [newPedido.nome, newPedido.email, newPedido.endereco, newPedido.cidade, newPedido.estado, newPedido.cep, newPedido.telefone];
    return this.executeSQL(sql, values);
  }
}

module.exports = new PedidoModel(); // Exporta uma instância única da classe PedidoModel
