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

exports.isOnRadius = async (req, res) => {
  latitude = req.body.latitude;
  longitude = req.body.longitude;
  try {
    row = await db.query(`SELECT latitude, longitude, raio FROM establishment where id = ${req.params.id}`);
    distance = distanceInKmBetweenEarthCoordinates (latitude, longitude, row.rows[0].latitude, row.rows[0].longitude);
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

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2-lat1);
  var dLon = degreesToRadians(lon2-lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return earthRadiusKm * c;
}