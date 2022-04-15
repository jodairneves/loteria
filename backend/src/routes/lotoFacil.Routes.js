const router = require("express")();

const LotoFacil = require("../controllers/lotoFacil.Controller");

router.post("/lotofacil", LotoFacil.create);

module.exports = router;
