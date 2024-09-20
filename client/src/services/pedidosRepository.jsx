import api from './base/api'; // Importa o cliente axios configurado (api) para comunicação com a API
import axios from 'axios'; // Importa o axios para outras operações de requisição HTTP

const pedidosRepository = {

  createPedidos: async (data) => {
    try {
      const response = await api.post('http://localhost:3000/Pedidos', data); // Faz uma requisição POST para criar um novo Pedido
      return response.data; // Retorna os dados do Pedido criado
    } catch (error) {
      console.error(`Erro ao criar pedidos:`, error); // Em caso de erro, imprime o erro no console
      throw error; // Lança o erro para ser tratado pelo código que chamou a função
    }
  }
}

export default pedidosRepository; // Exporta o objeto PedidosRepository como padrão