import React from "react"; // Importa a biblioteca React
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material"; // Importa componentes do Material-UI
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Importa o ícone CheckCircle do Material-UI

function Sobre() {
  // Define estilos personalizados para o componente
  const sobreStyles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      maxWidth: "800px",
      margin: "0 auto",
    },
    heading: {
      textAlign: "center",
      color: "#0097B2",
      marginBottom: "20px",
    },
    paragraph: {
      textAlign: "justify",
      marginBottom: "20px",
      lineHeight: "1.6",
    },
    list: {
      listStyleType: "none",
      padding: "0",
    },
    listItem: {
      backgroundColor: "#f5f5f5",
      padding: "12px",
      borderRadius: "5px",
      marginBottom: "10px",
      display: "flex",
      alignItems: "center",
    },
    listItemIcon: {
      minWidth: "auto",
      marginRight: "10px",
      color: "#7ED957",
    },
  };

  // Página estilizada falando sobre a empresa

  return (
    <Container maxWidth="md" sx={{ py: 4 }}> {/* Container centralizado e espaçado */}
      <Paper elevation={3} sx={{ p: 4, background: "#ffffff" }}> {/* Papel com elevação para dar sombra */}
        <Typography variant="h2" align="center" sx={{ color: "#0097B2", mb: 4 }}>
          Sobre
        </Typography>

        <Typography variant="body1" sx={{ ...sobreStyles.paragraph, mb: 4 }}>
          A Geek Shop foi fundada em 2024 visando dar trazer maior comodidade para os Geeks, os possibilitando de um local para poder comprar os itens sem nem precisar sair de casa. Desde o início, nosso foco tem sido oferecer diversos produtos da cultura Geek e sempre expandindo nosso repertório de itens.
        </Typography>

        <Typography variant="body1" sx={sobreStyles.paragraph}>
          O objetivo é criar uma plataforma para compra e envio fáceis de itens de diferentes nichos da cultura Geek. Independente se você quer quadrinhos, mangás, action figures ou apenas é só o fã de uma IP famosa de fantasia... Aqui você encontrará algo para que te atraia.
        </Typography>

        <Typography variant="h3" sx={sobreStyles.heading}>
          Nossos Valores
        </Typography>
        <List sx={sobreStyles.list}>
          
          <ListItem sx={sobreStyles.listItem}>
            <ListItemIcon sx={sobreStyles.listItemIcon}>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Qualidade: Oferecer apenas peças em excelente estado e de alta qualidade." />
          </ListItem>
          <ListItem sx={sobreStyles.listItem}>
            <ListItemIcon sx={sobreStyles.listItemIcon}>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Diversidade: Uma seleção diversificada que atende a todos os estilos e gostos." />
          </ListItem>
          <ListItem sx={sobreStyles.listItem}>
            <ListItemIcon sx={sobreStyles.listItemIcon}>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Transparência: Honestidade em nossas práticas e produtos." />
          </ListItem>
        </List>

        <Typography variant="h3" sx={sobreStyles.heading}>
          O Que Buscamos Diferenciar no Mercado
        </Typography>
        <Typography variant="body1" sx={sobreStyles.paragraph}>
          Expandir cada vez mais nosso repertório para poder agradar a cada um de nossos clientes. Queremos que toda vez que pensem em algo que queiram da cultura Geek, que possam encontrar na Geek Shop.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Sobre;
