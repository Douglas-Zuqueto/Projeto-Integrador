import React, { useState, useEffect } from "react"; // Importa React e hooks
import produtosRepository from "../services/produtosRepository"; // Importa o repositório de produtos
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material"; // Importa componentes do Material-UI
import Modal from "@mui/material/Modal"; // Importa o componente Modal do Material-UI
import EditIcon from "@mui/icons-material/Edit"; // Importa o ícone de edição
import DeleteIcon from "@mui/icons-material/Delete"; // Importa o ícone de deleção

function TabelaProdutos() {
  const [produtos, setProdutos] = useState([]); // Define o estado dos produtos
  const [open, setOpen] = useState(false); // Define o estado do modal
  const [currentProduto, setCurrentProduto] = useState({
    id: "",
    nome: "",
    descricao_detalhada: "",
    preco: "",
    qnt_estoque: "",
  }); // Define o estado do produto atual

  useEffect(() => {
    // Função que busca os produtos do repositório
    async function fetchData() {
      try {
        const produtosBD = await produtosRepository.getAllProdutos(); // Busca os produtos
        setProdutos(produtosBD); // Define o estado dos produtos com os dados buscados
      } catch (error) {
        console.error("Error fetching data:", error); // Exibe erro no console se ocorrer
      }
    }
    fetchData(); // Chama a função de busca de dados
  }, []); // Executa apenas uma vez após a montagem do componente

  const handleOpen = (produto) => {
    setCurrentProduto(produto); // Define o produto atual no estado
    setOpen(true); // Abre o modal
  };

  const handleClose = () => {
    setOpen(false); // Fecha o modal
    setCurrentProduto({
      id: "",
      nome: "",
      descricao_detalhada: "",
      preco: "",
      qnt_estoque: "",
    }); // Reseta o produto atual no estado
  };

  const handleChange = (e) => {
    const { name, value } = e.target; // Obtém o nome e valor do input
    setCurrentProduto({ ...currentProduto, [name]: value }); // Atualiza o produto atual no estado
  };

  const handleEdit = async () => {
    try {
      console.log(currentProduto)
      await produtosRepository.updateProdutos(
        currentProduto
      ); // Atualiza o produto no repositório
      setProdutos((prevProdutos) =>
        prevProdutos.map((produto) =>
          produto.id === currentProduto.id ? currentProduto : produto
        )
      ); // Atualiza o estado dos produtos com o produto editado
      handleClose(); // Fecha o modal
    } catch (error) {
      console.error("Erro", error); // Exibe erro no console se ocorrer
    }
  };

  const handleDelete = async (id) => {
    try {
      await produtosRepository.deleteProduto(id); // Deleta o produto do repositório
      setProdutos((prevProdutos) =>
        prevProdutos.filter((produto) => produto.id !== id)
      ); // Remove o produto deletado do estado
    } catch (error) {
      console.error("Erro ao deletar produto", error); // Exibe erro no console se ocorrer
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center" gutterBottom>
            Lista de Produtos
          </Typography>
        </Grid>

        {produtos.length > 0 && (
          <Grid item xs={12}>
            <TableContainer component={Paper} style={{ marginTop: 20 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell align="right">Preço</TableCell>
                    <TableCell align="right">Qnt. Estoque</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {produtos.map((produto) => (
                    <TableRow key={produto.id}>
                      <TableCell>{produto.id}</TableCell>
                      <TableCell>{produto.nome}</TableCell>
                      <TableCell>{produto.descricao_detalhada}</TableCell>
                      <TableCell align="right">{produto.preco}</TableCell>
                      <TableCell align="right">{produto.qnt_estoque}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpen(produto)}
                        >
                          <EditIcon color="success" />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(produto.id)}
                        >
                          <DeleteIcon color="success" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}

        <Grid item xs={12}>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div
          style={{
            padding: 20,
            background: "white",
            margin: "10% auto",
            width: "50%",
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Editar Produto
          </Typography>
          <form>
            <TextField
              margin="normal"
              fullWidth
              label="Nome"
              name="nome"
              color="success"
              value={currentProduto.nome}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Descrição"
              name="descricao_detalhada"
              color="success"
              value={currentProduto.descricao_detalhada}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Preço"
              name="preco"
              color="success"
              value={currentProduto.preco}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Quantidade"
              name="qnt_estoque"
              color="success"
              value={currentProduto.qnt_estoque}
              onChange={handleChange}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="success"
              onClick={handleEdit}
              style={{ marginTop: 20 }}
            >
              Salvar
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default TabelaProdutos;
