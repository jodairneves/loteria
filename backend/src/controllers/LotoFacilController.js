const getResults = require('../services/getResults');

module.exports = {
    async create(req, res) {
        const { value } = req.body;

        const games = await getResults(value);

        console.log(games)

        return res.json(games);
    },
}