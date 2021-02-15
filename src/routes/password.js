const router = require("express-promise-router")();
const passwordController = require("../controllers/passwordController");

router.post("/", passwordController.createPassword);
router.get("/", passwordController.getPassword);
router.get("/:id", passwordController.getUserPassword);

module.exports = router;
