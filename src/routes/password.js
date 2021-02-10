const router = require("express-promise-router")();
const passwordController = require("../controllers/passwordController");

router.post("/password", passwordController.createPassword);
router.get("/password", passwordController.getPassword);
router.get("/password/:id", passwordController.getUserPassword);

module.exports = router;
