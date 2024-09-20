const express = require('express');
const router = express.Router();  // Cria um novo router do Express para definir rotas

// Importa o controller de categorias para lidar com as requisições
const userController = require('../controllers/userController.js');

// Definição da rota para obter o usuário pelo ID
router.get('/user/:id', userController.getUserById);

module.exports = router;  // Exporta o router com as rotas configuradas para uso em outros módulos