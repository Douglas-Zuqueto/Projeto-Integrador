const UserModel = require('../models/userModel.js'); // Importa o modelo UserModel, responsável pela interação com os dados dos Users

// Obtém o usuário
exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id
    const user = await UserModel.getUserById(id); // Chama a função getByID do UserModel para obter o usuário
    res.status(200).json(user); // Retorna o usuário em formato JSON com o código de status 200 (OK)
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna um erro 500 caso ocorra um erro no servidor
  }
};