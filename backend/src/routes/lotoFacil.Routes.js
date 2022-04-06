const router = require('express')();

const LotoFacil = require('../controllers/lotoFacil.Controller');

router.post('/lotofacil', LotoFacil.create);
router.put('/lotofacil', LotoFacil.update);

module.exports = router;
