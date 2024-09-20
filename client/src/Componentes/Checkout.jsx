import React, { useState, useContext } from "react"; // Importa hooks e contexto do React
import AppContext from "../context/AppContext"; // Importa o contexto da aplicação
import Alert from "@mui/material/Alert"; // Importa o componente de alerta do Material-UI
import { Button, Typography } from "@mui/material"; // Importa o componente de tipografia do Material-UI
import Box from "@mui/material/Box"; // Importa o componente de caixa do Material-UI
import Divider from "@mui/material/Divider"; // Importa o componente de divisor do Material-UI
import Logo from "../assets/Logo.png"; // Importa a imagem do logo da aplicação
import { TextField, Grid } from "@mui/material"; // Importa componentes de campo de texto e grid do Material-UI
import { Link } from "react-router-dom"; // Importa o componente Link do React Router DOM
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"; // Importa o ícone de seta para voltar do Material-UI
import {loadStripe} from "@stripe/stripe-js"
import pedidosRepository from '../services/pedidosRepository'

function Checkout() {
  const [paid, setPaid] = useState(false); // Estado para controlar se o pagamento foi realizado
  const { cartItems, setCartItems } = useContext(AppContext); // Obtém os itens do carrinho do contexto da aplicação
  const apiURL = "http://localhost:3000"


  // Calcula o total da compra com base nos itens do carrinho
  const totalCompra = cartItems.reduce((acc, item) => {
    return (parseFloat(item.preco) * item.quantidade) + parseFloat(acc);
  }, 0);

  // Objeto de produto para o PayPal
  const product = {
    description: "", // Descrição do produto (atualmente vazio)
    price: totalCompra, // Preço total da compra
  };

  
  // Estado para os dados do formulário de entrega
  const [formularioCep, setFormularioCep] = useState({
    nome: "",
    email: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    telefone: "",
  });

  // Função para lidar com a mudança nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormularioCep({
      ...formularioCep,
      [name]: value,
    });
  };

  // Função para lidar com o envio do formulário de entrega
  const handlePayment = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de envio do formulário

    // Lógica e preparações para envio das informações necessárias ao Stripe para realização do pagamento
    const stripe = await loadStripe("pk_test_51PzSQPRt3UM2vYZHBWabsR4MXgzAULPJkppMS8aaMzq6VMbRzH7oKAxijk9Xf4sWnyaFbMTckofmGpYAG23VGO8q00PfEIRZjT");
    const body = cartItems;
    
    // Limpeza do carrinho ao realizar a compra
    setCartItems([]);

    // Criação de uma entrada com as informações do pedido no banco de dados
    const criaPedido = await pedidosRepository.createPedidos(formularioCep)
    
    console.log(criaPedido)

    const headers = {
      "Content-Type": "application/json"
    }

    const response = await fetch(`${apiURL}/create-checkout-session`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id
    });

    if(result.error){
      console.log(result.error)
    }
  };
  
  // Renderiza o conteúdo do componente Checkout

  return (
    <div
      style={{
        margin: "20px",
        border: "1px solid green",
        boxShadow: "0 10px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div>
        {paid ? (
          <div style={{ margin: "20px" }}>
            <Alert style={{ marginBottom: "20px" }} severity="success">
              Compra Finalizada com sucesso!
            </Alert>
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <ArrowBackIosIcon />
              <small>Voltar para página principal</small>
            </Link>
          </div>
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "50px",
                alignContent: "center",
              }}
            >
              <img
                src={Logo}
                alt="Logo"
                style={{ width: "90px", height: "auto", margin: "30px" }}
              />
              <Typography variant="h6"> Finalizar Compra </Typography>
            </div>

            <Divider />
            <Typography margin="10px" variant="h6" align="center">
              Resumo da Compra
            </Typography>
            <Divider />

            <Box
              margin="20px"
              padding={"20px"}
              sx={{ border: "1px dashed grey" }}
            >
              {cartItems.map((cartItem) => (
                <div key={cartItem.id}>
                  <img
                    src={cartItem.imagem}
                    alt={cartItem.nome}
                    loading="lazy"
                    width={"90px"}
                  />
                  <div>
                    <Typography margin="10px" variant="body2">
                      Item: {cartItem.nome}
                    </Typography>
                    <Typography margin="10px" variant="body2">
                      Descrição: {cartItem.descricao_detalhada}
                    </Typography>
                    <Typography margin="10px" variant="body2">
                      Valor:{cartItem.preco}
                    </Typography>
                    <Typography margin="10px" variant="body2">
                      Quantidade: {cartItem.quantidade}
                    </Typography>
                  </div>
                </div>
              ))}

              <Typography variant="h5">
                Total da compra: R$ {product.price.toFixed(2)}
              </Typography>
            </Box>

            <Typography margin="50px" variant="h6">
              Dados de entrega
            </Typography>
            <form onSubmit={handlePayment} style={{ margin: "50px" }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nome"
                    name="nome"
                    value={formularioCep.nome}
                    onChange={handleChange}
                    required
                    color="success"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formularioCep.email}
                    onChange={handleChange}
                    required
                    color="success"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Endereço"
                    name="endereco"
                    value={formularioCep.endereco}
                    onChange={handleChange}
                    required
                    color="success"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cidade"
                    name="cidade"
                    value={formularioCep.cidade}
                    onChange={handleChange}
                    required
                    color="success"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Estado"
                    name="estado"
                    value={formularioCep.estado}
                    onChange={handleChange}
                    required
                    color="success"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="CEP"
                    name="cep"
                    value={formularioCep.cep}
                    onChange={handleChange}
                    required
                    color="success"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Telefone"
                    name="telefone"
                    value={formularioCep.telefone}
                    onChange={handleChange}
                    required
                    color="success"
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
              <Button onClick={handlePayment}>Efetuar Compra</Button>
            </form>
            
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
                margin:"30px",
              }}
            >
              <ArrowBackIosIcon />
              <small>Voltar para página principal</small>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default  Checkout;
