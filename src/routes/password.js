const router = require("express-promise-router")();
const passwordController = require("../controllers/passwordController");
const {auth} = require("../controllers/middleware/auth");

router.post("/", auth, passwordController.createPassword);
router.get("/", auth, passwordController.getUserPassword);
router.get("/all", passwordController.getPassword);

module.exports = router;
