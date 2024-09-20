import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  Select,
  Alert,
} from "@mui/material"; // Importa componentes da MUI para estilizar a UI
import AppContext from "../context/AppContext"; // Importa o contexto da aplicação
import produtosRepository from "../services/produtosRepository"; // Importa funções para interação com a tabela de produtos
import categoriasRepository from "../services/categoriaRepository"; // Importa funções para interação com a tabela de categorias

export default function FormProdutos() {
  const [file, setFile] = useState(); // Estado para armazenar o arquivo de imagem selecionado
  const [values, setValues] = useState(); // Estado para armazenar valores do formulário
  const [categorias, setCategorias] = useState([]); // Estado para armazenar categorias

  const handleChangeValues = (values) => {
    // Função para atualizar o estado dos valores do formulário
    setValues((prevValue) => ({
      ...prevValue,
      [values.target.name]: values.target.value,
    }));
  };

  // Usa o contexto da aplicação para acessar e definir estados compartilhados
  const {
    // eslint-disable-next-line no-unused-vars
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
  } = useContext(AppContext);

  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar o alerta de sucesso

  useEffect(() => {
    // Recupera dados do formulário do localStorage quando o componente é montado
    const storedFormData = JSON.parse(localStorage.getItem("formData")) || {};
    setNome(storedFormData.nome || "");
    setDescricao(storedFormData.descricao || "");
    setPreco(storedFormData.preco || "");
    setQuantidade(storedFormData.quantidade || "");
    setCategoria(storedFormData.categoria || "");
    setSelectedFile(null);
  }, []);

  useEffect(() => {
    // Busca categorias do repositório quando o componente é montado
    async function fetchData() {
      try {
        const categoriasBD = await categoriasRepository.getCategoriasAll();
        console.log(categoriasBD);
        setCategorias(categoriasBD);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Define o comportamento padrão do formulário
    const produtoCreate = {
      nome: values.nome,
      preco: values.preco,
      descricao_detalhada: values.descricao_detalhada,
      imagem: "",
      qnt_estoque: values.qnt_estoque,
      categoria_id: categoria,
    };
    produtosRepository.createProdutos(produtoCreate)
      .then((response) => {   // Monta o produto conforme os dados do formulário

        const prodId = response.insertId;
        const formData = new FormData();
        formData.append("image", file);
        formData.append("id", prodId);
        produtosRepository.uploadImage(formData);
      });

    if (!file) {
      alert("Por favor, selecione uma imagem para o produto.");
      return;
    }

    const novoProduto = {
      id: crypto.randomUUID(),
      nome: nome,
      descricao: descricao,
      preco: preco,
      quantidade: quantidade,
      categoria: categoria,
      imagem: file.name,
    };

    setProdutos([...produtos, novoProduto]);

    // Reseta os campos do formulário
    setSelectedFile("");
    setNome("");
    setDescricao("");
    setPreco("");
    setQuantidade("");
    setCategoria("");
    setFile("");

    localStorage.removeItem("formData");

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Atualiza o estado do arquivo com o arquivo selecionado
  };

  return (
    <Paper elevation={3} style={{ padding: 20 }}>
      <form onSubmit={handleSubmit} onChange={handleChangeValues}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nome"
              name="nome"
              variant="outlined"
              fullWidth
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              color="success"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="success"
              label="Descrição"
              name="descricao_detalhada"
              variant="outlined"
              fullWidth
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="success"
              label="Preço"
              name="preco"
              variant="outlined"
              fullWidth
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="success"
              label="Imagem Selecionada"
              name="imagem"
              variant="outlined"
              fullWidth
              value={file ? file.name : ""}
              InputProps={{
                readOnly: true,
              }}
              required
            />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="image-upload-button"
              type="file"
              onChange={handleFileChange}
              required
            />
            <label htmlFor="image-upload-button">
              <Button variant="outlined" component="span" color="success">
                Escolher Imagem
              </Button>
            </label>
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="success"
              label="Quantidade estoque"
              name="qnt_estoque"
              variant="outlined"
              fullWidth
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              label="Categoria"
              name="categoria_id"
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              value={categoria}
              required
              onChange={(e) => setCategoria(e.target.value)}
              color="success"
            >
              {categorias.map((categoria) => (
                <MenuItem
                  value={categoria.id}
                  key={categoria.id}
                  onSelect={(e) => setCategorias(e.target.value)}
                >
                  {categoria.nome}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="success">
              Adicionar Produto
            </Button>
          </Grid>
        </Grid>
      </form>

      {showAlert && (
        <div style={{ marginTop: 10 }}>
          <Alert severity="success">Produto adicionado com sucesso!</Alert>
        </div>
      )}
    </Paper>
  );
}
