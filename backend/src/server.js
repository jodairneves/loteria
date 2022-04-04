const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

/*app.use(cors({
    origin: 'https://meu-dominio.com.br'
}));*/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: 'application/vnd.api+json' }));

app.use(routes);

app.listen(3001);