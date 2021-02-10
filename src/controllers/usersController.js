const db = require("../config/database");

exports.login = async (req, res) => {
  const { name } = req.body;
  try {
    const { rows } = await db.query(
      `INSERT INTO users (username) VALUES (${name})`
    );
    res.status(201).send({
      message: `User ${name} created successfully!`,
    });
  } catch (error) {
    console.error("login", error);
    res.status(500).send({
      message: "Ocorreu um erro.",
    });
  }
};
