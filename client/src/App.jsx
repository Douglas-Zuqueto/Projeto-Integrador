import React from "react"; // Importa o react 
import Sidebar from "./Componentes/Sidebar"; // Importa o componente Sidebar
import { useNavigate, Route, Routes } from "react-router-dom"; // Importa elementos de roteamento do React Router
import "./styles.global.css"; // Importa um arquivo de estilos globais (possível erro de digitação em 'styles.global.css')
import Provider from "./context/Provider"; // Importa o componente Provider de um contexto específico
import FormProdutos from "./Componentes/FormProdutos"; // Importa o componente FormProdutos
import Produtos from "./Componentes/Produtos"; // Importa o componente Produtos
import Sobre from "./Componentes/Sobre"; // Importa o componente Sobre
import PerguntasFrequentes from "./Componentes/PerguntasFrequentes"; // Importa o componente PerguntasFrequentes
import TabelaProdutos from "./Componentes/TabelaProdutos"; // Importa o componente TabelaProdutos
import Checkout from "./Componentes/Checkout"; // Importa o componente Checkout
import Search from './Componentes/ResultadoPesquisa' // Importa o componente Search
import PaySuccess from './Componentes/paySuccess' // Importa o componente PaySuccess
import PayCancel from './Componentes/payCancel' // Importa o componente PayCancel



function App() {
  return (
    <>
      <Provider> {/* Renderiza o componente Provider para prover contexto aos componentes abaixo */}
          <Routes> {/* Define as rotas dentro do componente Routes */}
            <Route path="/" element={<Sidebar />}> {/* Rota principal que renderiza o Sidebar */}
              <Route index element={<Produtos />} /> {/* Rota para renderizar o componente Produtos na página inicial */}
              <Route path="/search" element={<Search />} /> {/* Rota para renderizar o componente Search */}
              <Route path="/sobre" element={<Sobre />} /> {/* Rota para renderizar o componente Sobre */}
              <Route path="/pix" element={<Checkout />} /> {/* Rota para renderizar o componente Checkout */}
              <Route path="/perguntasFrequentes" element={<PerguntasFrequentes />}/> {/* Rota para renderizar o componente PerguntasFrequentes */}
              <Route path="/TabelaProdutos" element={<TabelaProdutos />} /> {/* Rota para renderizar o componente TabelaProdutos */}
              <Route path="/addNovoProduto" element={<FormProdutos />} /> {/* Rota para renderizar o componente FormProdutos */}
              <Route path="/pay_success" element={<PaySuccess />} /> {/* Rota para renderizar o componente da página quando o pagamento é um sucesso */}
              <Route path="/pay_cancel" element={<PayCancel />} /> {/* Rota para renderizar o componente da página quando o pagamento é cancelado */}
            </Route>
            <Route path="/FinalizarCompra" element={<Checkout />} /> {/* Rota para renderizar o componente de resumo da compra */}
          </Routes>
      </Provider>
    </>
  );
}

export default App;
