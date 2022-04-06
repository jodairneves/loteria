const express = require('express');
const cors = require('cors');

const app = express();

//  => Rotas
const lotoFacil = require('./routes/lotoFacil.Routes')
const updateGames = require('./routes/updateGames.routes')

/*app.use(cors({
    origin: 'https://meu-dominio.com.br'
}));*/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: 'application/vnd.api+json' }));

app.use('/api', lotoFacil);
app.use('/api', updateGames)

module.exports = app;