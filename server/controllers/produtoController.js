const ProdutoModel = require('../models/produtoModel.js'); // Importa o modelo ProdutoModel, responsável pela interação com os dados dos produtos

// Obtém todos os produtos
exports.getAllProdutos = async (req, res) => {
  try {
    const produtos = await ProdutoModel.readList(); // Chama a função readList do ProdutoModel para obter todos os produtos
    res.status(200).json(produtos); // Retorna os produtos em formato JSON com o código de status 200 (OK)
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna um erro 500 caso ocorra um erro no servidor
  }
};

// Cria um novo produto
exports.createProduto = async (req, res) => {
  try {
    const newProduto = req.body; // Obtém os dados do novo produto do corpo da requisição
    const produto = await ProdutoModel.create(newProduto); // Chama a função create do ProdutoModel para criar um novo produto
    res.status(201).json(produto); // Retorna o produto criado em formato JSON com o código de status 201 (Created)
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna um erro 500 caso ocorra um erro no servidor
  }
};

// Obtém um produto pela id
exports.getProdutoById = async (req, res) => {
  try {
    const produto = await ProdutoModel.read(req.params.id); // Chama a função read do ProdutoModel para obter um produto pelo nome
    if (produto) {
      res.json(produto); // Retorna o produto encontrado em formato JSON com o código de status 200 (OK)
    } else {
      res.status(404).json({ message: 'Produto não encontrado' }); // Retorna um erro 404 se o produto não for encontrado
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna um erro 500 caso ocorra um erro no servidor
  }
};

// Atualiza a imagem de um produto pelo ID
exports.updateImagemProduto = async (req, res) => {
  try {
    const updatedProduto = req.body.file.filename; // Obtém o nome do arquivo de imagem atualizado do corpo da requisição
    const produto = await ProdutoModel.updateImagem(updatedProduto, req.params.id); // Chama a função updateImagem do ProdutoModel para atualizar a imagem do produto pelo ID
    res.json(produto); // Retorna o produto atualizado em formato JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna um erro 500 caso ocorra um erro no servidor
  }
};

// Atualiza um produto
exports.updateProduto = async (req, res) => {
  try {
    const updatedProduto = req.body; // Obtém os novos dados do produto pelo corpo da requisição
    const produto = await ProdutoModel.updateProduto(updatedProduto); // Chama a função update do ProdutoModel para atualizar um produto
    res.status(201).json(produto); // Retorna o produto criado em formato JSON com o código de status 201 (Updated)
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna um erro 500 caso ocorra um erro no servidor
  }
};

// Atualiza um produto
exports.updateProdutoEstoque = async (req, res) => {
  try {
    const quantidade = req.body // Obtém os novos dados do produto pelo corpo da requisição
    const produto = await ProdutoModel.updateProdutoEstoque(quantidade); // Chama a função update do ProdutoModel para atualizar um produto
    res.status(201).json(produto); // Retorna o produto criado em formato JSON com o código de status 201 (Updated)
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna um erro 500 caso ocorra um erro no servidor
  }
};

// Deleta um produto pelo ID
exports.deleteProduto = async (req, res) => {
  try {
    await ProdutoModel.delete(req.params.id); // Chama a função delete do ProdutoModel para deletar um produto pelo ID
    res.status(204).send(); // Retorna um código de status 204 (No Content) indicando que a operação foi bem-sucedida
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna um erro 500 caso ocorra um erro no servidor
  }
};
