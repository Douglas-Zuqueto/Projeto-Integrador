
import { useState} from "react"; // Importa useState do React
import SearchIcon from "@mui/icons-material/Search"; // Importa o ícone de pesquisa do Material UI
import InputBase from "@mui/material/InputBase"; // Importa o componente de entrada base do Material UI
import { styled } from "@mui/material/styles"; // Importa a função de estilização do Material UI
import { Backdrop, Button } from "@mui/material"; // Importa o componente Button do Material UI
import { Navigate } from "react-router-dom"; // Componentes de roteamento do React Router

// Estiliza o componente InputBase com cores e espaçamento personalizado
const StyledInputBase = styled(InputBase)(() => ({
  color: "black",
  padding: "0px 8px",
}));

function BarraDePesquisa() {
  const [searchValue, setSearchValue] = useState(""); // Estado para armazenar o valor de pesquisa
  const [redirect, setRedirect] = useState("");

  const handleSearch = (event) => {
    event.preventDefault(); // Evita o comportamento padrão do formulário ao submeter
    setRedirect(true);
  };

  if(redirect) {
    const path = "/search?term=" + searchValue
    return <Navigate to={path} replace={false}/>;
  }

  return (
    <form style={{backgroundColor: "white", 
      display: "flex",
      alignItems: "center",
      padding: "6px",
      borderRadius: "10px",
      border: "1px solid black"}} 
      onSubmit={handleSearch}> {/* Formulário com estilo aplicado */}
      <StyledInputBase
        value={searchValue} // Valor atual do campo de pesquisa
        placeholder="Pesquise aqui" // Texto de placeholder
        onChange={({ target }) => setSearchValue(target.value)} // Atualiza o estado ao digitar
        required // Torna o campo obrigatório
      />
      <Button type="submit" style={{ color: "black" }}> {/* Botão de submissão do formulário */}
        <SearchIcon /> {/* Ícone de pesquisa dentro do botão */}
      </Button>
    </form>
  );
}

export default BarraDePesquisa; 