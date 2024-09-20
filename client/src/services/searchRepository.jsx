import api from './base/api'

// Função responsável por realizar a busca de itens com o nome ou categoria utilizando parametros para passar o valor a ser procurado
const searchRepository = {
    searchNome: async (data) => {
        try {
          const string = "%" + data + "%"
          const values = {data: string}
          const response = await api.post('http://localhost:3000/search', values);
          console.log(response.data)
          return response.data;
        } catch (error) {
          console.error('Erro ao buscar search:', error);
          throw error;
        }
      }
    }
    
    export default searchRepository