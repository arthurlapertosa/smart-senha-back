const db = require("../config/database");
const utils = require ("../utils/utils");

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

exports.isOnRadius = async (req, res) => {
  latitude = req.body.latitude;
  longitude = req.body.longitude;
  try {
    row = await db.query(`SELECT latitude, longitude, raio FROM establishment where id = ${req.params.id}`);
    distance = utils.distanceInKmBetweenEarthCoordinates (latitude, longitude, row.rows[0].latitude, row.rows[0].longitude);
    if (distance > row.rows[0].raio) {
      return res.status(401).send({
        message: "Usuário está fora da zona de raio configurada pelo cliente.",
      });
    }
    return res.status(200).send(row);
  } catch (error) {
    console.error("isOnRadius", error);
    return res.status(500).send({
      message: "Ocorreu um erro.",
    });
  }
}