// Importação das bibliotecas e funções necessárias.
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import {BrowserRouter, useNavigate} from "react-router-dom"

// Importa a publishable key do Clerk do arquivo .env
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// Valida se a publishable key está sendo devidamente preenchida com algo
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


const root = ReactDOM.createRoot(document.getElementById('root'))

// Criação de elemento para utilizar rotas usando o encapsulamento do Clerk passando a publishable key como parametro
const ClerkWithRoutes = () => {
  const navigate = useNavigate()

  return (
  <ClerkProvider 
    publishableKey={PUBLISHABLE_KEY}
    navigate= {(to) => navigate(to)}
  >
    <App />
  </ClerkProvider>)
}

root.render(
  <React.StrictMode>
      <BrowserRouter>
        <ClerkWithRoutes />
      </BrowserRouter>
  </React.StrictMode>,
)