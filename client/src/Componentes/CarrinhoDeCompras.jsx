import React from "react"; // Importa React para utilizar componentes e hooks do React
import Box from "@mui/material/Box"; // Importa Box component do Material-UI para estruturação de layout
import Drawer from "@mui/material/Drawer"; // Importa Drawer component do Material-UI para criar um drawer (gaveta)
import Button from "@mui/material/Button"; // Importa Button component do Material-UI para botões
import List from "@mui/material/List"; // Importa List component do Material-UI para listas
import ListItem from "@mui/material/ListItem"; // Importa ListItem component do Material-UI para itens de lista
import Typography from "@mui/material/Typography"; // Importa Typography component do Material-UI para tipografia
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Importa ShoppingCartIcon do Material-UI para ícone de carrinho de compras
import IconButton from "@mui/material/IconButton"; // Importa IconButton component do Material-UI para botões de ícone
import Badge from "@mui/material/Badge"; // Importa Badge component do Material-UI para insígnias/badges
import Divider from "@mui/material/Divider"; // Importa Divider component do Material-UI para divisores
import ItemCarrinho from "./ItemCarrinho"; // Importa componente ItemCarrinho local para exibir itens do carrinho
import AppContext from "../context/AppContext"; // Importa contexto global da aplicação
import { Link } from "react-router-dom"; // Importa Link do react-router-dom para navegação entre rotas
import { SignedIn, SignedOut, SignInButton} from '@clerk/clerk-react'

export default function CarrinhoDeCompras() {
  const { cartItems, logged } = React.useContext(AppContext); // Obtém estado do carrinho e status de login do contexto global
  const [state, setState] = React.useState({
    right: false, // Estado para controlar se a gaveta (drawer) está aberta ou fechada
  });

  // Função para alternar o estado da gaveta (abrir ou fechar)
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "backdropClick"
    ) {
      return;
    }

    setState({ ...state, [anchor]: open }); // Atualiza o estado da gaveta com o lado específico (anchor) aberto ou fechado
  };

 
  // Calcula o total da compra somando os preços dos itens no carrinho
  let totalCompra = cartItems.reduce((acc, item) => {
    return (parseFloat(item.preco) * item.quantidade) + parseFloat(acc);
  }, 0);

  // Componente da lista dentro da gaveta (drawer)
  const list = (anchor) => (
    <Box
      sx={{ width: 450 }} // Estilo para largura da gaveta
      role="presentation"
      onClick={toggleDrawer(anchor, true)} // Função para fechar a gaveta ao clicar fora dela
      onKeyDown={toggleDrawer(anchor, true)} // Função para fechar a gaveta ao usar teclado
    >
      <List>
        <Typography variant="h6" align="center">
          Carrinho {/* Título da gaveta */}
        </Typography>

        <Divider /> {/* Divisor entre seções da lista */}

        {/* Condicional para verificar se o carrinho está vazio */}
        {cartItems.length === 0 ? (
          <Typography variant="body1" align="center">
            Seu carrinho está vazio. {/* Mensagem exibida se o carrinho estiver vazio */}
          </Typography>
        ) : (
          // Mapeia cada item no carrinho para exibir na lista
          cartItems.map((cartItem) => (
            <div key={cartItem.id}>
              <ListItem>
                <ItemCarrinho data={cartItem} /> {/* Componente para exibir informações do item do carrinho */}
              </ListItem>
              <Divider /> {/* Divisor entre itens da lista */}
            </div>
          ))
        )}

        <Divider /> {/* Divisor final da lista */}

        <Typography variant="h6" align="center">
          Total: {totalCompra.toFixed(2)} {/* Exibe o total da compra formatado para duas casas decimais */}
        </Typography>
          <SignedIn>
          <Link to={"/FinalizarCompra"}>
            <Button color="success">Finalizar Compra</Button> {/* Botão para finalizar a compra */}
        </Link>
          </SignedIn>
          <SignedOut>
            <div style={{display: "flex", justifyContent: "center", alignContent: "center", height: "auto" }}>
              <SignInButton style={{marginTop: "15px", justifySelf: "center", height: "40px", width: "120px"}}/>
            </div>
          </SignedOut>
      </List>
    </Box>
  );

  return (
    <div>
      {/* Botão para abrir a gaveta (drawer) */}
      <Button onClick={toggleDrawer("right", true)}>
        <IconButton
          size="large"
          aria-label="show shopping cart"
          color="inherit"
        >
          {/* Ícone do carrinho de compras com badge (insígnia) mostrando o número de itens no carrinho */}
          <Badge badgeContent={cartItems.length} color="error">
            <ShoppingCartIcon sx={{ color: "black" }} /> {/* Ícone do carrinho de compras */}
          </Badge>
        </IconButton>
      </Button>

      {/* Gaveta (drawer) para exibir o carrinho de compras */}
      <Drawer
        anchor="right" // Posição da gaveta à direita
        open={state["right"]} // Estado para controlar se a gaveta está aberta ou fechada
        onClose={toggleDrawer("right", false)} // Função para fechar a gaveta
      >
        {list("right")} {/* Renderiza a lista dentro da gaveta */}
      </Drawer>
    </div>
  );
}
