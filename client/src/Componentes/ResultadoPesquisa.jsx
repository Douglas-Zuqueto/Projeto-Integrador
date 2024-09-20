import React, { useState, useEffect } from "react";
import ProdutoCard from "./ProdutoCard";
import searchRepository from "../services/searchRepository";
import { useSearchParams } from "react-router-dom";




function produtosSearch() {
  const [produtos, setProdutos] = useState([]);
  const [searchParams, setSeachParams] = useSearchParams("")

  useEffect(() => {
    async function fetchData() {
      try {
        const term = searchParams.get("term");
        const produtosSearch = await searchRepository.searchNome(term)
        setProdutos(produtosSearch);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const tema = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  };

  return (
    <>
      <div style={tema}>
        {produtos.length > 0 ? (
          produtos.map((produtos) => (
            <ProdutoCard key={produtos.id} data={produtos} />
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
            Nenhum produto encontrado. :({" "}
          </p>
        )}
      </div>
    </>
  );
}

export default produtosSearch;
