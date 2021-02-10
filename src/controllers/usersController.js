const db = require("../config/database");

exports.login = async (req, res) => {
  try {
    res.status(200).send({ jwt: "fdklsaj;fls" });
  } catch (error) {
    console.error("listAllEmployees", error);
    res.status(500).send({
      message: "Ocorreu um erro.",
    });
  }
};
