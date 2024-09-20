/* eslint-disable react/react-in-jsx-scope */
// Desabilita o linting para o escopo do React, pois este arquivo não utiliza JSX diretamente

import { useState, useEffect } from "react"; // Importa useState e useEffect do React para gerenciar estado e efeitos
import AppContext from "./AppContext"; // Importa o contexto global da aplicação
import PropTypes from "prop-types"; // Importa PropTypes do prop-types para validar propriedades

function Provider({ children }) {
  // Define um componente Provider que recebe children como propriedade

  // Estados para armazenar informações do formulário e do contexto global da aplicação
  const [selectedFile, setSelectedFile] = useState();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [categoria, setCategoria] = useState("");
  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [fullName, setFullName] = useState("");

  // Efeito para carregar itens do carrinho salvos no localStorage quando o componente é montado
  useEffect(() => {
    const salvarCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (salvarCartItems.length > 0) {
      setCartItems(salvarCartItems);
    }
  }, [setCartItems]);

  // Efeito para salvar itens do carrinho no localStorage sempre que cartItems é atualizado
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Objeto de contexto que contém todos os estados e funções que serão compartilhados com outros componentes
  const value = {
    loading,
    setLoading,
    selectedFile,
    setSelectedFile,
    nome,
    setNome,
    descricao,
    setDescricao,
    preco,
    setPreco,
    quantidade,
    setQuantidade,
    categoria,
    setCategoria,
    produtos,
    setProdutos,
    cartItems,
    setCartItems,
    fullName,
    setFullName,
  };

  // Renderiza o contexto global da aplicação Provider com o valor definido e os componentes filhos
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Define as propriedades esperadas pelo componente Provider utilizando PropTypes para validação
Provider.propTypes = {
  children: PropTypes.any.isRequired, 
};

export default Provider; 
