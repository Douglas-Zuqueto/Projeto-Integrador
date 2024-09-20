const dbConnection = require('../db/dbConnection.js'); // Importa o módulo de conexão com o banco de dados

class ProdutoModel {
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

  // Retorna todos os produtos cadastrados
  readList() {
    const sql = "SELECT * FROM produtos";
    return this.executeSQL(sql);
  }

  // Retorna produtos cujo nome contenha o valor especificado
  read(id) {
    const sql = "SELECT nome, preco, descricao_detalhada, imagem, qnt_estoque, categoria_id FROM produtos WHERE id = ?";
    return this.executeSQL(sql, id);
  }

  // Cria um novo produto na tabela 'produtos'
  create(newProduto) {
    const sql = "INSERT INTO produtos (nome, preco, descricao_detalhada, imagem, qnt_estoque, categoria_id) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [newProduto.nome, newProduto.preco, newProduto.descricao_detalhada, newProduto.imagem, newProduto.qnt_estoque, newProduto.categoria_id];
    return this.executeSQL(sql, values);
  }

  // Atualiza a imagem de um produto existente baseado no ID
  updateImagem(updatedProduto, id) {
    const sql = "UPDATE produtos SET imagem = ? WHERE id = ?";
    const values = [updatedProduto.imagem, id];
    return this.executeSQL(sql, values);
  }


// Atualiza o cadastro de um produto da tabela 'produtos'  

  updateProduto(updatedProduto) {
    const sql = "UPDATE produtos SET nome = ?, preco = ?, descricao_detalhada = ?, qnt_estoque = ?  WHERE id = ?";
    const values = [updatedProduto.nome, updatedProduto.preco, updatedProduto.descricao_detalhada, updatedProduto.qnt_estoque, updatedProduto.id];
    return this.executeSQL(sql, values);
  }

  // Atualiza o cadastro de um produto da tabela 'produtos'  

  updateProdutoEstoque(quantidade) {
    const sql = "UPDATE produtos SET qnt_estoque = ?  WHERE id = ?";
    const values = [quantidade.quantidade, quantidade.id];
    return this.executeSQL(sql, values);
  }

// Deleta um produto da tabela 'produtos' baseado no ID
  delete(id) {
    const sql = "DELETE FROM produtos WHERE id = ?";
    return this.executeSQL(sql, id);
  }
}

module.exports = new ProdutoModel(); // Exporta uma instância única da classe ProdutoModel
