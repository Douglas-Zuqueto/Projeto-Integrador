import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Outlet, Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";

// Componentes do Material-UI
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";

import {
  MoreVert as MoreIcon,
  Apps as AppsIcon,
  FormatListBulleted as FormatListBulletedIcon,
  Help as HelpIcon,
  Info as InfoIcon,
  Home as HomeIcon
} from "@mui/icons-material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import TableRowsIcon from "@mui/icons-material/TableRows";

// Componentes locais
import BarraDePesquisa from "./BarraDePesquisa";
import CarrinhoDeCompras from "./CarrinhoDeCompras";

// Imagem
import Logo from "../assets/Logo.png";
import AppContext from "../context/AppContext";
import { Navigate } from "react-router-dom"; // Componentes de roteamento do React Router



const drawerWidth = 240;

function Sidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Produtos");

  const StyledBotao = {
    background: `linear-gradient(45deg, rgba(0, 151, 178), rgba(126, 217, 87))`,
    borderRadius: "8px",
    display: "flex",
    gap: "5px",
    alignItems: "center",
    padding: "8px",
    margin: "10px",
    color: "#FFFF",
  };

  // Estado para o menu mobile
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (text) => {
    setSelectedItem(text);
  };

  // Renderização do menu mobile
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* Itens do menu mobile */}
      
      <MenuItem onClick={handleMobileMenuClose}>
        <CarrinhoDeCompras />
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </MenuItem>
    </Menu>
  );


  // Funções para fechar e transição do drawer
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  let items = []

  // useAuth() pega dados do usuário logado, entre elas userId, que está sendo usado para validação de admin
  const {userId} = useAuth()
  console.log(userId)

// Itens do menu lateral para o admin
if(userId === 'user_2mDMKLWj5yfrG3Id0i9zEsieJkE') {
  items = [
   { text: "Home", icon: <HomeIcon />, route: "/" },
   { text: "Produtos", icon: <TableRowsIcon />, route: "/TabelaProdutos" },
   { text: "Adicionar Novo Produto", icon: <AddCircleIcon />, route: "/addNovoProduto" },
 ];
}
// Itens do menu lateral para compradores
else {
 items = [
   { text: "Produtos", icon: <AppsIcon />, route: "/" },
   { text: "Perguntas Frequentes", icon: <HelpIcon />, route: "/perguntasFrequentes" },
   { text: "Sobre", icon: <InfoIcon />, route: "/sobre" },
 ];
}

  // Estrutura do drawer
  const drawer = (
    <div style={{ margin: "0px", padding: "0px", backgroundColor: "#8C52FF", height: "100%"}}>
      {/* Logo */}
      <div style={{ display: "flex", justifyContent: "center", padding: "0px" }}>
        <img
          src={Logo}
          alt="Logo"
          style={{ width: "auto", height: "200px", objectFit: "cover", margin: "30px" }}
        />
      </div>
      <Divider />
      <List>
        {items.map((item) => (
          <ListItem key={item.text} disablePadding style={{ width: "100%" }}>
            <Link
              to={item.route}
              onClick={() => handleMenuClick(item.text)}
              style={{
                paddingLeft: "10px",
                width: "100%",
                textDecoration: "none",
                color: "inherit",
                background:
                  selectedItem === item.text
                    ? "linear-gradient(45deg, rgba(0, 151, 178), rgba(126, 217, 87))"
                    : "inherit",
              }}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  // Container para o drawer
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", backgroundColor: "#8C52FF", height: "100%"}}>
      {/* Barra de navegação superior */}
      <AppBar
        color=""
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#8C52FF",
          height: "auto"
        }}
      >
        <Toolbar>
          {/* Botão para abrir o drawer no modo mobile */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "100px", height: "auto" }}
            />
          </IconButton>
          <BarraDePesquisa/>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <CarrinhoDeCompras />
            <SignedOut> {/* Componente do Clerk para encapsulamento do que é visto se não estiver logado */}
              <SignInButton /> {/* Botão de redirecionamento para página de Login do Clerk */}
            </SignedOut>
            <SignedIn> {/* Componente do Clerk para encapsulamento do que é visto se estiver logado */}
              <UserButton /> {/* Botão para gerenciar usuário ou realizar o Logout, padrão do Clerk */}
            </SignedIn>
          </Box>
          {/* Ícone de mais opções no modo mobile */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
        {renderMobileMenu}
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Drawer para modo mobile */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Drawer para modo desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* Conteúdo principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  window: PropTypes.func,
};

export default Sidebar;
