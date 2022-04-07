const getResults = require('../services/getResults');
const pool = require('../database/databaseConnection');

module.exports = {
    async create(req, res) {
        const { value } = req.body;
        const ultimo_concurso = new Date();

        const games = await getResults(value);
        try {
            const jogos = await pool.query(
                'SELECT concurso FROM lotofacil'
            );
            if (jogos.rows.length < 0) {
                return res.status(409).json('O sistema já possui dados salvos no banco!');
            }

            await pool.query(
                'INSERT INTO sistema ' +
                '(concurso, num_01, num_02, num_03, num_04, num_05, num_06, num_07, num_08, num_09, num_10, ' +
                'num_11, num_12, num_13, num_14, num_15, ultimo_concurso) ' +
                'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)',
                [randomUUID(), '1.0.0', ultimo_concurso]
            );

        } catch (error) {
            console.error(error)
        }

        console.log(games)

        return res.json(games);
    },
    async update(req, res) {
        const { value } = req.body;

        const games = await getResults(value);

        console.log(games)

        return res.json(games);
    },
}