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

exports.getAllInRadius = async (req, res) => {
  latitude = req.query.latitude;
  longitude = req.query.longitude;
  if (!longitude || !latitude) {
    return res.status(400).send({ error: 'Missing latitute or longitude' });
  }
  try {
    const result = await db.query(allEstablishmentsOnRadiusQuery(latitude, longitude));
    res.status(200).send(result[1].rows);
  } catch (error) {
    console.error("getAllInRadius", error);
    res.status(500).send({
      message: "Ocorreu um erro.",
    });
  }
}

const allEstablishmentsOnRadiusQuery = (lat, lon)  => {
  return `
    CREATE OR REPLACE FUNCTION calculate_distance(lat1 float, lon1 float, lat2 float, lon2 float)
    RETURNS float AS $dist$
      DECLARE
        dist float = 0;
        radlat1 float;
        radlat2 float;
        theta float;
        radtheta float;
      BEGIN
        IF lat1 = lat2 AND lon1 = lon2
          THEN RETURN dist;
        ELSE
          radlat1 = pi() * lat1 / 180;
          radlat2 = pi() * lat2 / 180;
          theta = lon1 - lon2;
          radtheta = pi() * theta / 180;
          dist = sin(radlat1) * sin(radlat2) + cos(radlat1) * cos(radlat2) * cos(radtheta);
          IF dist > 1 THEN dist = 1; END IF;
          dist = acos(dist);
          dist = dist * 180 / pi();
          dist = dist * 60 * 1.1515 * 1.609344;
          RETURN dist;
        END IF;
      END;
    $dist$ LANGUAGE plpgsql;

    SELECT * from establishment
    WHERE calculate_distance(${lat}, ${lon}, latitude, longitude) <= raio;
  `
}
