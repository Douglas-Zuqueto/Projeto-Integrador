/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AppContext from "../context/AppContext";  // Importa o contexto da aplicação
import handlePlusItem from "./ItemCarrinho"
import { SignedIn, SignedOut, SignInButton} from '@clerk/clerk-react'

function ProdutoCard({ data }) {
  const { cartItems, setCartItems } = useContext(AppContext);  // Usa o contexto para acessar e atualizar o carrinho

  // Função para adicionar o produto ao carrinho
  const handleAddCart = () => {

    const validate = cartItems.find((item) => item.id === data.id);
    if(!validate){
      data.quantidade = 1;
      data.precoUnit = data.preco;
      data.precoTotal = (data.preco * parseFloat(data.quantidade)).toFixed(2);
      setCartItems([...cartItems, data]);
    }
    else {
      handlePlusItem()
    }
  }
  const imagem = data.imagem;  // Atribui a imagem do produto a uma variável

  return (
    <div>
      <Card sx={{width: 220, height: 440}}>
        <CardMedia
          component="img"
          image={imagem}
          src={imagem}
          alt={data.nome}  // Define a imagem do produto
          sx={{maxHeight: 270, marginTop: "20px"}}
        />
        <CardContent>
          <Divider />  {/* Adiciona uma linha divisória */}
          <Typography variant="h8">{data.nome}</Typography>  {/* Exibe o nome do produto */}
          <Typography variant="body1" color="textSecondary" align="right">
            R${data.preco}  {/* Exibe o preço do produto */}
          </Typography>
          <Divider />  {/* Adiciona outra linha divisória */}
          <SignedIn>
            <Button
              variant="contained"
              color="success"
              startIcon={<AddShoppingCartIcon />}
              onClick={handleAddCart}  // Adiciona o produto ao carrinho quando o botão é clicado
            >
              Adicionar ao Carrinho
            </Button>
          </SignedIn>
          <SignedOut>
            <div style={{display: "flex", justifyContent: "center", alignContent: "center", height: "auto" }}>
              <SignInButton style={{marginTop: "15px", justifySelf: "center", height: "40px", width: "120px"}}/>
            </div>
          </SignedOut>
        </CardContent>
      </Card>
    </div>
  );
}

ProdutoCard.propTypes = {
  data: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    imagem: PropTypes.string.isRequired,
    preco: PropTypes.string.isRequired
  }).isRequired,  // Define as propriedades esperadas e seus tipos
};

export default ProdutoCard;
