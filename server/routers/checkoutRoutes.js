// Importação do módulo express para criação de rotas
const express = require('express');
const router = express.Router();  // Cria um novo router do Express para definir rotas
const dotenv = require("dotenv")

dotenv.config()

// Lógica necessária integração do stripe no backend
const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post("/create-checkout-session", async (req, res) => {
    const products = req.body;

    const lineItems = products.map((product) => ({
        price_data:{
            currency:"BRL",
            product_data: {name: product.nome},  
            unit_amount: Math.round(product.preco*100)
        },
        quantity: product.quantidade
    }))
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:5173/pay_success",
        cancel_url: "http://localhost:5173/pay_cancel"
    })

    res.json({id: session.id})

})

module.exports = router;