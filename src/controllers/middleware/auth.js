const jwt = require('jsonwebtoken');
const db = require("../../config/database");

exports.auth = async (req, res, next) => {
  try {
    const tokenJwt = req.headers['x-access-token'];
    if(!tokenJwt){
      return res.status(400).json({ error: 'Missing headers[x-access-token]' });
    }
    const id = jwt.verify(tokenJwt, process.env.JWT_SECRET, {
      ignoreExpiration: true
    });
    const result = await db.query(
      `SELECT *
      FROM users
      WHERE id = ${id}
      LIMIT 1;
      `
    );
    res.locals.userAuthenticated = result.rows[0];
    next();
  } catch (error) {
    if (error.name == 'JsonWebTokenError'){
      return res.status(400).json({ error: 'Invalid x-access-token' });
    }
    console.error("auth", error);
    res.status(500).send({
      message: "Ocorreu um erro.",
    });
  }
}
