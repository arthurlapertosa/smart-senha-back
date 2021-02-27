const db = require("../config/database");

exports.getEstablishments = async (req, res) => {
  try {
    const { rows } = await db.query(`SELECT * FROM establishment`);
    res.status(200).send(rows);
  } catch (error) {
    console.error("getPassword", error);
    res.status(500).send({
      message: "Ocorreu um erro.",
    });
  }
};
