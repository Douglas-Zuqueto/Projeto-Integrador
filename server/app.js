const dotenv = require('dotenv'); // To read CLERK_API_KEY
const cors = require('cors')
const express = require('express');
const produtoRouter = require('./routers/produtoRoutes.js')
const categoriaRouter = require('./routers/categoriaRoutes.js')
const searchRouter = require('./routers/searchRoutes.js')
const bodyParser = require('body-parser')
const checkoutRouter = require('./routers/checkoutRoutes.js')
const webhook = require('svix')
const compradorModel = require('./models/compradorModel.js')
const userRouter = require('./routers/userRoutes.js')
const pedidoRouter = require('./routers/pedidoRoutes.js')

// Configurar o dotenv para utilizar o arquivo .env no servidor
dotenv.config()

const port = process.env.PORT;
const app = express();

const dbConnection = require("./db/dbConnection.js");

const db = require("./db/dbCreate.js");

db.initConnection(dbConnection);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: true }));

// Instanciação das rotas para responderem as requisições feitas pelo app.
app.use(produtoRouter);
app.use(categoriaRouter);
app.use(searchRouter);
app.use(checkoutRouter);
app.use(userRouter)
app.use(pedidoRouter)

// Lógica utilizada para adicionar as mudanças dos usuários realizadas pelo Clerk ao banco de dados
app.post( 
  "/User", bodyParser.raw({ type: "application/json" }),
  async function (req, res) {
    try{
      const payloadString = JSON.stringify(req.body);
      const svixHeaders = req.headers;

      const wh = new webhook.Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
      const evt = wh.verify(payloadString, svixHeaders);

      const {id, first_name, last_name} = evt.data;
      const fullName = first_name + " " + last_name
      const eventType = evt.type;

      if(eventType === 'user.created') {
        const newUser = {id: id, nome: fullName}
        compradorModel.create(newUser)
        res.status(200).json({success: true, message: "Usuário Criado."})
      }
      else if(eventType === 'user.updated') {
        const updatedUser = {id: id, email: email, nome: fullName}
        compradorModel.update(updatedUser, id)
        res.status(200).json({success: true, message: "Usuário atualizado."})
      }
      else if(eventType === 'user.deleted') {
        compradorModel.delete(id)
        res.status(200).json({success: true, message: "Usuário deletado."})
      }
    }catch(err){
      res.status(400).json({success: false, message: err.message})
    }
  }
)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;