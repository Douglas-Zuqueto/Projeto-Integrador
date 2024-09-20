const CategoriaModel = require('../models/categoriaModel.js'); // Importa o modelo CategoriaModel, responsável pela interação com os dados das categorias

// Cria uma nova categoria
exports.createCategoria = async (req, res) => {
  try {
    const newCategoria = req.body; // Obtém os dados da nova categoria do corpo da requisição
    const categoria = await CategoriaModel.create(newCategoria); // Chama a função create do CategoriaModel para criar uma nova categoria
    res.status(201).json(categoria); // Retorna a categoria criada com o código de status 201 (Created)
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna um erro 500 caso ocorra um erro no servidor
  }
};

// Obtém todas as categorias
exports.getCategoriasAll = async (req, res) => {
  try {
    const categorias = await CategoriaModel.readAll(); // Chama a função readAll do CategoriaModel para obter todas as categorias
    if (categorias.length > 0) {
      res.status(200).json(categorias); // Retorna as categorias em formato JSON se encontradas
    } else {
      res.status(404).json({ message: 'Categoria não encontrada' }); // Retorna um erro 404 se nenhuma categoria for encontrada
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna um erro 500 caso ocorra um erro no servidor
  }
};

// Obtém categorias por gênero masculino
exports.getCategoriasByMale = async (req, res) => {
  try {
    const categorias = await CategoriaModel.read('M'); // Chama a função read do CategoriaModel para obter categorias com gênero masculino
    if (categorias.length > 0) {
      res.status(200).json(categorias); // Retorna as categorias em formato JSON se encontradas
    } else {
      res.status(404).json({ message: 'Categoria não encontrada' }); // Retorna um erro 404 se nenhuma categoria for encontrada
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna um erro 500 caso ocorra um erro no servidor
  }
};

// Obtém categorias por gênero feminino
exports.getCategoriasByFemale = async (req, res) => {
  try {
    const categorias = await CategoriaModel.read('F'); // Chama a função read do CategoriaModel para obter categorias com gênero feminino
    if (categorias.length > 0) {
      res.status(200).json(categorias); // Retorna as categorias em formato JSON se encontradas
    } else {
      res.status(404).json({ message: 'Categoria não encontrada' }); // Retorna um erro 404 se nenhuma categoria for encontrada
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna um erro 500 caso ocorra um erro no servidor
  }
};

// Atualiza uma categoria pelo ID
exports.updateCategoria = async (req, res) => {
  try {
    const updatedCategoria = req.body; // Obtém os dados atualizados da categoria do corpo da requisição
    const categoria = await CategoriaModel.update(updatedCategoria, req.params.id); // Chama a função update do CategoriaModel para atualizar uma categoria pelo ID
    res.json(categoria); // Retorna a categoria atualizada em formato JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna um erro 500 caso ocorra um erro no servidor
  }
};

// Deleta uma categoria pelo ID
exports.deleteCategoria = async (req, res) => {
  try {
    await CategoriaModel.delete(req.params.id); // Chama a função delete do CategoriaModel para deletar uma categoria pelo ID
    res.status(204).send(); // Retorna o código de status 204 (No Content) indicando que a operação foi realizada com sucesso
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna um erro 500 caso ocorra um erro no servidor
  }
};
