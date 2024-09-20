// Importação do módulo express para criação de rotas
const express = require('express');
const router = express.Router();  // Cria um novo router do Express para definir rotas

// Importa o controller de pedidos para lidar com as requisições
const pedidoController = require('../controllers/pedidoController');

// Definição das rotas da API para pedidos
router.post('/Pedidos', pedidoController.createPedido);  // Rota para criar uma novo pedido
module.exports = router;  // Exporta o router com as rotas configuradas para uso em outros módulos