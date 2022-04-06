const getResults = require('../services/getResults');
const pool = require('../database/databaseConnection');

module.exports = {
    async update(req, res) {
        try {
            const jogos = await pool.query(
                'SELECT concurso FROM lotofacil ORDER BY concurso DESC LIMIT 1'
            );
            console.log(jogos.rows.length)
            if (jogos.rows.length > 0) {
                const lastSavedGame = jogos.rows[0].concurso;
                console.log(lastSavedGame)
                const games = await getResults(lastSavedGame);
                return res.status(409).json(games);
            } else {
                const games = await getResults(0);
                return res.status(409).json(games);
            }
        } catch (error) {
            console.error(error)
            return res.status(404).json('Deu ruim no Sistema!');
        }
    }
}