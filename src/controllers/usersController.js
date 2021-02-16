const db = require("../config/database");
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO users (username) VALUES ('${name}') returning id;`
    );
    const createdUserId = result.rows[0].id;
    const tokenJwt = jwt.sign(createdUserId, process.env.JWT_SECRET);
    res.status(201).send({
      message: `User ${name} created successfully!`,
      tokenJwt,
    });
  } catch (error) {
    console.error("login", error);
    res.status(500).send({
      message: "Ocorreu um erro.",
    });
  }
};
