// Importação do módulo express para criação de rotas
const express = require('express');
const router = express.Router();  // Cria um novo router do Express para definir rotas

// Importa o controller de categorias para lidar com as requisições
const categoriaController = require('../controllers/categoriaController');

// Definição das rotas da API para categorias
router.post('/', categoriaController.createCategoria);  // Rota para criar uma nova categoria
router.get('/categorias', categoriaController.getCategoriasAll);  // Rota para obter todas as categorias
router.get('/categorias/M', categoriaController.getCategoriasByMale);  // Rota para obter categorias masculinas
router.get('/categorias/F', categoriaController.getCategoriasByFemale);  // Rota para obter categorias femininas
router.put('/:id', categoriaController.updateCategoria);  // Rota para atualizar uma categoria específica por ID
router.delete('/:id', categoriaController.deleteCategoria);  // Rota para deletar uma categoria específica por ID

module.exports = router;  // Exporta o router com as rotas configuradas para uso em outros módulos
