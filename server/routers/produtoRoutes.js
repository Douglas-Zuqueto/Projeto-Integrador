// Importação de módulos necessários
const express = require('express');
const router = express.Router();  // Criação de um router do Express para roteamento
const produtoController = require('../controllers/produtoController');  // Importa o controller de produtos
const multer = require('multer');  // Importa o multer para upload de arquivos
const path = require('path');  // Módulo para lidar com caminhos de arquivos no sistema de arquivos
const dbConnection = require('../db/dbConnection.js');  // Importa a conexão com o banco de dados

// Configuração do armazenamento para o multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/src/assets/images/');  // Define o diretório de destino dos uploads
  },
  filename: (req, file, cb) => {
    // Define o nome do arquivo de upload com base no nome original e na data atual
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

// Configuração do middleware multer com as opções de armazenamento
const upload = multer({
  storage: storage
});

// Rotas definidas para a API
router.get('/produtos', produtoController.getAllProdutos);  // Rota para obter todos os produtos
router.get('/produtos/:id', produtoController.getProdutoById);  // Rota para obter todos os produtos
router.post('/produtos', produtoController.createProduto);  // Rota para criar um novo produto
router.post('/produto', upload.single('image'), (req, res) => {
  // Rota para upload de imagem de um produto específico
  console.log(req.file);  // Exibe informações do arquivo enviado para o servidor
  const id = req.body.id;  // Obtém o ID do produto a ser atualizado com a nova imagem
  const image = req.file.destination.slice(10) + req.file.filename;  // Constrói o caminho completo da imagem
  const sql = "UPDATE produtos SET imagem = ? WHERE id = ?";  // Query SQL para atualizar a imagem no banco de dados
  // Executa a query de atualização no banco de dados
  dbConnection.query(sql, [image, id], (err, result) => {
    if (err) return res.json({ Message: "Error" });  // Retorna um JSON com mensagem de erro se ocorrer um problema
    return res.json({ Status: "Success" });  // Retorna um JSON com mensagem de sucesso após a atualização
  });
});
router.post('/produtoUpdate', produtoController.updateProduto);  // Rota para atualizar um novo produto
router.delete('/produtos/:id', produtoController.deleteProduto);  // Rota para deletar um produto específico
router.post('/produtoUpdateEstoque', produtoController.updateProdutoEstoque);  // Rota para atualizar um novo produto

module.exports = router;  // Exporta o router com as rotas configuradas para uso em outros módulos