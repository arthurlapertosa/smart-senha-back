const router = require("express-promise-router")();
const establishmentController = require("../controllers/establishmentController");

router.get('/', establishmentController.getEstablishments);

module.exports = router;
