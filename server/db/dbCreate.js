class eCommerceDatabase {
  // Método para inicializar a conexão com o banco de dados
  initConnection(connection) {
    this.connection = connection; // Estabelece a conexão recebida como propriedade da classe
    this.initDatabase(); // Inicia a configuração do banco de dados
  }

  // Método para iniciar a configuração do banco de dados
  initDatabase() {
    this.connection.connect((error) => {
      if (error) {
        console.log("Ocorreu um erro ao conectar no banco de dados...");
        console.log(error.message);
        return;
      }
      this.createDatabase(); // Chama o método para criar o banco de dados
    });
  }

  // Método para criar o banco de dados se não existir
  createDatabase() {
    const sql =
      "CREATE DATABASE IF NOT EXISTS db_ecommerce DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci";

    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar o banco de dados...");
        console.log(error.message);
        return;
      }

      // Seleciona o banco de dados recém-criado para uso
      this.connection.query("USE db_ecommerce", (error) => {
        if (error) {
          console.log("Ocorreu um erro ao selecionar o banco de dados...");
          console.log(error.message);
          return;
        }
        this.createTable(); // Chama o método para criar as tabelas do banco de dados
      });
    });
  }

  // Método para criar as tabelas do banco de dados
  createTable() {
    // Criação da tabela 'user'
    const sqlUsers = `
        CREATE TABLE IF NOT EXISTS db_ecommerce.users (
          id VARCHAR(255) PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          role VARCHAR(10) DEFAULT "USER" NOT NULL
        )
      `;

    this.connection.query(sqlUsers, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela users...");
        console.log(error.message);
        return;
      }
    });

    // Criação da tabela 'categorias'
    const sqlCategorias = `
        CREATE TABLE IF NOT EXISTS db_ecommerce.categorias (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL
        )
      `;

    this.connection.query(sqlCategorias, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela categorias...");
        console.log(error.message);
        return;
      }
    });

    // Criação da tabela 'produtos'
    const sqlProdutos = `
        CREATE TABLE IF NOT EXISTS db_ecommerce.produtos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          preco DECIMAL(10, 2) NOT NULL, 
          descricao_detalhada TEXT, 
          imagem VARCHAR(255) NOT NULL, 
          qnt_estoque INT NOT NULL,
          categoria_id INT, 
          FOREIGN KEY (categoria_id) REFERENCES categorias(id) 
        )
      `;

    this.connection.query(sqlProdutos, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela produtos...");
        console.log(error.message);
        return;
      }
    });

    // Criação da tabela 'user'
    const sqlPedidos = `
        CREATE TABLE IF NOT EXISTS db_ecommerce.pedidos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          endereco VARCHAR(255) NOT NULL,
          cidade VARCHAR(255) NOT NULL,
          estado VARCHAR(255) NOT NULL,
          cep VARCHAR(255) NOT NULL,
          telefone VARCHAR(255) NOT NULL
        )
      `;

    this.connection.query(sqlPedidos, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela pedidos...");
        console.log(error.message);
        return;
      }
    });
  }
}

module.exports = new eCommerceDatabase();
