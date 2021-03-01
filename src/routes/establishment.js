const router = require("express-promise-router")();
const establishmentController = require("../controllers/establishmentController");

router.get('/', establishmentController.getEstablishments);
router.post('/:id', establishmentController.isOnRadius);

module.exports = router;
