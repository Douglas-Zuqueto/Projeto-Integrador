import React from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function PerguntasFrequentes() {
  // Array de objetos contendo as perguntas e respostas frequentes
  const faqItems = [
    {
      question: "O que é a Geek Shop?",
      answer:
        "A Geek Shop é uma loja de produtos da cultura Geek fundade em 2024 com o objetivo de promover maior facilidade de obtenção de artigos de qualidade.",
    },
    {
      question: "Como posso comprar na Geek Shop?",
      answer:
        "Você pode comprar na Geek Shop visitando nossa loja online ou física. Na loja online, adicione os itens desejados ao carrinho, prossiga para o checkout e siga as instruções para finalizar a compra.",
    },
    {
      question: "Quais são as formas de pagamento aceitas?",
      answer:
        "Aceitamos apenas cartão de crédito pelo site atualmente. Na loja física aceitamos cartão de crédito, débito e dinheiro",
    },
    {
      question: "Qual é a política de devolução da Geek Shop?",
      answer:
        "Não aceitamos devoluções de produtos selados.",
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Papel para dar uma elevação visual ao conteúdo */}
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Título da seção */}
        <Typography variant="h4" align="center" sx={{ color: "#0097B2", mb: 4 }}>
          Perguntas Frequentes
        </Typography>

        {/* Mapeia os itens de FAQ e cria um acordeão para cada um */}
        {faqItems.map((item, index) => (
          <Accordion key={index} sx={{ mb: 3 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ color: "#009733" }}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ textAlign: "justify" }}>
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        {/* Linha divisória entre os itens FAQ e o rodapé */}
        <Divider sx={{ my: 4 }} />
      </Paper>
    </Container>
  );
}

export default PerguntasFrequentes;
