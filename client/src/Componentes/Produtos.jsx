import React, { useState, useEffect } from "react";
import ProdutoCard from "./ProdutoCard";  // Importa o componente para exibir cada produto
import produtosRepository from "../services/produtosRepository";  // Importa o serviço para buscar produtos

function Produtos() {
  const [produtos, setProdutos] = useState([]);  // Estado para armazenar a lista de produtos

  // useEffect para buscar produtos ao carregar o componente
  useEffect(() => {
    async function fetchData() {
      try {
        const produtosBD = await produtosRepository.getAllProdutos();  // Busca produtos do repositório
        setProdutos(produtosBD);  // Atualiza o estado com os produtos obtidos
      } catch (error) {
        console.error("Error fetching data:", error);  // Exibe erro no console se a busca falhar
      }
    }

    fetchData();  // Chama a função de busca de dados
  }, []);  // Executa apenas uma vez ao carregar o componente

  const tema = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",  // Layout em grid com colunas automáticas
    gap: "20px",  // Espaçamento entre os itens do grid
  };

  return (
    <>
      <div style={tema}>
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <ProdutoCard key={produto.id} data={produto} />  // Renderiza ProdutoCard para cada produto
          ))
        ) : (
          <p
            style={{
              textAlign: "center",
              marginTop: "50px",
              fontSize: "1.3rem",
              color: "#888",
            }}
          >
            Nenhum produto encontrado. :(  {/* Mensagem exibida se não houver produtos */}
          </p>
        )}
      </div>
    </>
  );
}

export default Produtos;
