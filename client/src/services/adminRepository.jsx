import api from './base/api'; // Importa o objeto 'api' de um arquivo específico que contém métodos para fazer requisições HTTP

const adminRepository = {
  // Objeto adminRepository que contém métodos para interagir com endpoints relacionados a tabela users

  getAdminById: async (id) => {
    // Método para buscar um usuário por ID
    try {
      const response = await api.get(`http://localhost:3000/user/${id}`);// Faz uma requisição GET para o endpoint '/user/${id}' utilizando o objeto 'api'
      return response.data; // Retorna os dados recebidos da resposta da API
    } catch (error) {
      console.error(`Erro ao buscar usuário com ID ${id}:`, error); // Se ocorrer um erro, registra o erro no console
      throw error; // Lança o erro para ser tratado pelo código que chama este método
    }
  },
}

export default adminRepository; 
