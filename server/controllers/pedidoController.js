const PedidoModel = require('../models/PedidoModel.js'); // Importa o modelo PedidoModel, responsável pela interação com os dados das Pedidos

// Cria uma nova Pedido
exports.createPedido = async (req, res) => {
  try {
    const newPedido = req.body; // Obtém os dados da nova Pedido do corpo da requisição
    const pedido = await PedidoModel.create(newPedido); // Chama a função create do PedidoModel para criar uma nova Pedido
    res.status(201).json(pedido); // Retorna a Pedido criada com o código de status 201 (Created)
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna um erro 500 caso ocorra um erro no servidor
  }
};
