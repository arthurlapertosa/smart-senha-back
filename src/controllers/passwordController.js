const db = require("../config/database");

exports.createPassword = async (req, res) => {
  const { user_id } = req.body;
  try {
    const { rows } = await db.query(
      `INSERT INTO password (user_id) VALUES ${user_id}`
    );
    res.status(201).send({
      message: `Password created for user ${user_id}`,
    });
  } catch (error) {
    console.error("createEmployee", error);
    res.status(500).send({
      message: "Ocorreu um erro.",
    });
  }
};

exports.getUserPassword = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(
      `SELECT id
        FROM password WHERE user_id = ${id} and already_attended = false
        order by id limit 1`
    );
    if (!rows.length) {
      throw "password_not_found";
    }
    res.status(200).send(rows[0]);
  } catch (error) {
    console.error("getPassword", error);
    res.status(500).send({
      message: "Ocorreu um erro.",
    });
  }
};

exports.getPassword = async (req, res) => {
  try {
    const { rows } = await db.query(`SELECT 
                                      id,
                                      user_id, 
                                      already_attended, 
                                      created_at
                                    FROM password ORDER BY id`);
    res.status(200).send(rows);
  } catch (error) {
    console.error("getPassword", error);
    res.status(500).send({
      message: "Ocorreu um erro.",
    });
  }
};
