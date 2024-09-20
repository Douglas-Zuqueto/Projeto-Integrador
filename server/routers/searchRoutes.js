const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Rota para pesquisa da barra de busca
router.post('/search', searchController.searchNome);

module.exports = router;