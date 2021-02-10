const router = require("express-promise-router")();
const usersController = require("../controllers/usersController");

// Loga usuario e retorna token jwt
router.post("/login", usersController.login);

//Exemplos de outras de CRUD
/*router.get('/users', usersController.listAllEmployees);

router.get('/employees/:id', usersController.findEmployeeById)

router.put('/employees/:id', usersController.updateEmployeeById)

router.delete('/employees/:id', usersController.deleteEmployeeById);*/

module.exports = router;
