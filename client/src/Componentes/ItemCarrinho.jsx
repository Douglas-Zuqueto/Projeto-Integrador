import React, { useContext, useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import propTypes from "prop-types"; // Importação do propTypes para definição de tipos
import AppContext from "../context/AppContext"; // Importação do contexto da aplicação


const ItemCarrinho = ({ data }) => {
  const { cartItems, setCartItems } = useContext(AppContext); // Uso do useContext para acessar o contexto da aplicação
  const { id, imagem, nome, precoUnit, quantidade , precoTotal } = data; // Destruturação das propriedades do item de dados passado como prop

  // Função para realizar o aumento na quantidade de dado item no carrinho
  const handlePlusItem = () => {
    const updatedItems = cartItems.find((item) => item.id === id);
    updatedItems.quantidade += 1;
    updatedItems.precoTotal = (parseFloat(updatedItems.preco) * updatedItems.quantidade).toFixed(2);
    setCartItems([...updatedItems, cartItems])
  }

  // Função para realizar a diminuição na quantidade de dado item no carrinho
  const handleMinusItem = () => {
    const updatedItems = cartItems.find((item) => item.id === id);
    updatedItems.quantidade -= 1;
    
    // Se a quantidade chegar a 0 roda a função que remove o item do carrinho.
    if(updatedItems.quantidade === 0) {
      handleDeleteItem()
      return
    }
    updatedItems.precoTotal = (parseFloat(updatedItems.preco) * updatedItems.quantidade).toFixed(2);
    setCartItems([...updatedItems, cartItems])
  }

  const handleDeleteItem = () => {
    const updatedItems = cartItems.filter((item) => item.id !== id); // Filtra os itens do carrinho, removendo o item atual pelo seu id
    setCartItems(updatedItems); // Atualiza o estado do carrinho com os itens filtrados
  };

  return (
    <Card sx={{ height: "100px", width: "100%", display: "flex" }}> {/* Cartão que envolve o item do carrinho */}
      {/* Imagem do produto */}
      <img
        src={imagem}
        alt={nome}
        style={{ width: "70px", height: "auto", objectFit: "cover" }} // Estilo da imagem
      />
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <Typography variant="subtitle3" component="div">
          {nome} {/* Nome do produto */}
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {precoTotal} {/* Preço do produto */}
          </Typography>
          <br></br>
          <Button
            aria-label="add"
            color="primary"
            onClick={handlePlusItem}
          >+</Button>
          <Typography 
            id="qtd-item" 
            variant="body2" 
            color="text.secondary"
            >{quantidade}
            </Typography>
          <Button
            aria-label="remove"
            color="primary"
            onClick={handleMinusItem}
          >-</Button>
          <IconButton
            aria-label="delete"
            color="error" // Ícone de delete com cor vermelha
            sx={{ marginLeft: "auto" }} // Espaçamento à esquerda automático
            onClick={handleDeleteItem} // Função para deletar o item ao clicar no ícone
          >
            <DeleteForeverIcon style={{ width: "20px" }} /> {/* Ícone de delete */}
          </IconButton>
          <br></br>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCarrinho;

ItemCarrinho.propTypes = {
  data: propTypes.object.isRequired, // Definição das propriedades esperadas para o objeto 'data'
};
