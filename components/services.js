const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const mercadopago = require('mercadopago');
const config = require('./Config/index.json');

let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mercadopago.configure({ access_token: config.token })

let port = process.env.PORT || 3000;

app.post('/', (req, res) => {
    let preference = {
        items: [
            {
                title: 'Efetuar pagmento da vaga',
                unit_price: req.body.price,
                quantity: 1,
            }
        ],
        payer: {
            name: req.body.nome,
            email: req.body.email
        },
        payment_methods: {
            installments: 2
        }
    }

    mercadopago.preferences.create(preference)
        .then(function (response) {
            res.send(JSON.stringify(response.response.sandbox_init_point));
            global.id = response.body.id;
        }).catch(function (error) {
            console.log(error);
        });
})

app.listen(port, (req, res) => {
    console.log('servidor rodando')
})


