import api from "./base/api"; // Importa o objeto 'api' de um arquivo específico que contém métodos para fazer requisições HTTP

const categoriasRepository = {
  // Objeto categoriasRepository que contém métodos para interagir com endpoints relacionados a categorias

  getCategoriasAll: async () => {
    // Método para buscar todas as categorias
    try {
      const response = await api.get("http://localhost:3000/categorias"); // Faz uma requisição GET para o endpoint 'http://localhost:3000/categorias' utilizando o objeto 'api'
      return response.data; // Retorna os dados recebidos da resposta da API
    } catch (error) {
      console.error(`Erro ao buscar categorias `, error); // Se ocorrer um erro, registra o erro no console
      throw error; // Lança o erro para ser tratado pelo código que chama este método
    }
  },

};

export default categoriasRepository; 
