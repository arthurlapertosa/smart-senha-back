const router = require("express-promise-router")();
const passwordController = require("../controllers/passwordController");
const { auth } = require("../controllers/middleware/auth");

router.post("/", auth, passwordController.createPassword);
router.get("/:passwordID", auth, passwordController.getUserPassword);
router.get("/all", passwordController.getPassword);
router.get("/byEstablishment/:id", passwordController.getPasswordsByEstablishment);
router.delete("/:id", passwordController.deletePassword);
router.put("/complete/:id", passwordController.markPasswordAsComplete);
router.put("/calling/:id", passwordController.callPassword);
router.put("/cancel/:passwordID", passwordController.cancelPassword);

module.exports = router;
