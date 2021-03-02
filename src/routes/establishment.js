const router = require("express-promise-router")();
const establishmentController = require("../controllers/establishmentController");

router.get('/', establishmentController.getEstablishments);
router.get('/inRadius', establishmentController.getAllInRadius);
router.post('/:id', establishmentController.isOnRadius);

module.exports = router;
