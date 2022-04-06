const router = require('express')();

const updateGames = require('../controllers/updateGames.Controller')


router.get('/update', updateGames.update);

module.exports = router;
