const router = require("express-promise-router")();
const passwordController = require("../controllers/passwordController");

router.post("/password", passwordController.createPassword);
router.get("/password/:id", passwordController.getPassword);
