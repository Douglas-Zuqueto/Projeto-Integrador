import api from './base/api'; // Importa o cliente axios configurado (api) para comunicação com a API
import axios from 'axios'; // Importa o axios para outras operações de requisição HTTP

const produtosRepository = {
  getAllProdutos: async () => {
    try {
      const response = await api.get('http://localhost:3000/produtos'); // Faz uma requisição GET para obter todos os produtos
      return response.data; // Retorna os dados dos produtos
    } catch (error) {
      console.error('Erro ao buscar produtos:', error); // Em caso de erro, imprime o erro no console
      throw error; // Lança o erro para ser tratado pelo código que chamou a função
    }
  },

  createProdutos: async (data) => {
    try {
      const response = await api.post('http://localhost:3000/produtos', data); // Faz uma requisição POST para criar um novo produto
      return response.data; // Retorna os dados do produto criado
    } catch (error) {
      console.error(`Erro ao criar produtos:`, error); // Em caso de erro, imprime o erro no console
      throw error; // Lança o erro para ser tratado pelo código que chamou a função
    }
  },

  getProdutosByName: async (nome) => {
    try {
      const response = await api.get(`/produtos?nome=${nome}`); // Faz uma requisição GET para buscar produtos por nome
      return response.data; // Retorna os dados dos produtos encontrados
    } catch (error) {
      console.error(`Erro ao buscar produtos com nome ${nome}:`, error); // Em caso de erro, imprime o erro no console
      throw error; // Lança o erro para ser tratado pelo código que chamou a função
    }
  },

  getProdutosById: async (id) => {
    try {
      const response = await api.get(`http://localhost:3000/${id}`); // Faz uma requisição GET para buscar produtos por nome
      return response.data; // Retorna os dados dos produtos encontrados
    } catch (error) {
      console.error(`Erro ao buscar produtos com id ${id}:`, error); // Em caso de erro, imprime o erro no console
      throw error; // Lança o erro para ser tratado pelo código que chamou a função
    }
  },

  uploadImage: async (bodyFormData) => {
    try {
      const response = await axios({ // Faz uma requisição POST para enviar uma imagem para a API
        method: "post",
        url: "http://localhost:3000/produto",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" } // Define o cabeçalho para dados de formulário multipart
      });
      return response.data; // Retorna os dados da resposta da API
    } catch (error) {
      console.error(`Erro ao atualizar produtos:`, error); // Em caso de erro, imprime o erro no console
      throw error; // Lança o erro para ser tratado pelo código que chamou a função
    }
  },

  updateProdutos: async (data) => {
    try {
      const response = await api.post('http://localhost:3000/produtoUpdate', data); // Faz uma requisição POST para atualizar um novo produto
      return response.data; // Retorna os dados do produto atualizado
    } catch (error) {
      console.error(`Erro ao criar produtos:`, error); // Em caso de erro, imprime o erro no console
      throw error; // Lança o erro para ser tratado pelo código que chamou a função
    }
  },

  updateProdutoEstoque: async (data) => {
    try {
      const response = await api.post('http://localhost:3000/produtoUpdateEstoque', data); // Faz uma requisição POST para atualizar um novo produto
      return response.data; // Retorna os dados do produto atualizado
    } catch (error) {
      console.error(`Erro ao criar produtos:`, error); // Em caso de erro, imprime o erro no console
      throw error; // Lança o erro para ser tratado pelo código que chamou a função
    }
  },

  deleteProduto: async (id) => {
    try {
      const response = await api.delete(`http://localhost:3000/produtos/${id}`); // Faz uma requisição DELETE para excluir um produto pelo ID
      return response.data; // Retorna os dados do produto excluído
    } catch (error) {
      console.error(`Erro ao deletar produtos:`, error); // Em caso de erro, imprime o erro no console
      throw error; // Lança o erro para ser tratado pelo código que chamou a função
    }
  }
};

export default produtosRepository; // Exporta o objeto produtosRepository como padrão
