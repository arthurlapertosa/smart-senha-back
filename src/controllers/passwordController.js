const db = require("../config/database");

exports.createPassword = async (req, res) => {
  
  const user_id = res.locals.userAuthenticated.id;
  const { establishmentId } = req.body;
  
  if (!establishmentId)
    return res.status(422).send({ error: 'Missing "establishmentId" in body' });

  try {

    const { rows } = await db.query(
      `SELECT id, establishment, currently_calling
        FROM password WHERE user_id = ${user_id} and already_attended = false and canceled = false
        order by id limit 1`
    );

    if (rows.length > 0) {
      // User already have a password.
      return res.status(403).send({
        error:
          "User already have an active password. Please complete or cancel the current password before creating another.",
      });
    }

    const result = await db.query(
      `INSERT INTO password (user_id, establishment) VALUES (${user_id}, ${establishmentId}) returning id`
    );

    res.status(201).send({
      message: `Password created for user ${user_id} and establishment ${establishmentId}`,
      id: result.rows[0].id,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Ocorreu um erro." });
  }
};

exports.getUserPassword = async (req, res) => {
  
  const passwordID = req.params.passwordID
  const userID = res.locals.userAuthenticated.id

  try {

    // Busca senha
    const passwordQueryResult = await db.query(`SELECT * FROM password WHERE id = ${passwordID} and user_id = ${userID} order by id limit 1`);
    const password = passwordQueryResult.rows[0]
    if (!password)
      return res.status(404).send({ message: 'Senha não encontrada' })

    // Determina quantidade de senha anteriores a essa
    const usersQueryResult = await db.query(
      `SELECT COUNT(*)
        FROM password
        WHERE already_attended = false
        AND establishment = ${password.establishment}
        AND id < ${password.id}`
    );

    const usersAhead = +usersQueryResult.rows[0].count
    if (Number.isNaN(usersAhead))
      throw new Error('Falha ao tentar determinar quantidade de senhas a frente')

    res.status(200).send({ ...password, usersAhead })

  } catch (error) {
    console.error("getPassword", error);
    res.sendStatus(500)
  }
};


exports.cancelPassword = async (req, res) => {
  
  const passwordID = req.params.passwordID

  try {

    // Verifica se senha existe
    const validationQueryResult = await db.query(`SELECT COUNT(*) FROM password WHERE id = ${passwordID}`);
    const passwordExists = !!+validationQueryResult.rows[0].count
    if (!passwordExists)
      return res.status(404).send({ message: 'Senha não encontrada' })

    // Cancela senha
    await db.query(`UPDATE password SET canceled = true WHERE id = ${passwordID}`);
    res.sendStatus(200)

  } catch (error) {
    console.error("cancelPassword", error);
    res.sendStatus(500)
  }
};

exports.getPassword = async (req, res) => {
  try {
    const { rows } = await db.query(`SELECT 
                                      id,
                                      user_id,
                                      establishment, 
                                      currently_calling,
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

exports.getPasswordsByEstablishment = async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT 
        password.id,
        username,
        password.user_id,
        establishment, 
        already_attended, 
        currently_calling,
        password.created_at
      FROM password
      INNER JOIN users ON password.user_id = users.id
      where establishment = ${parseInt(req.params.id)}
      ORDER BY id `
    );
    res.status(200).send(rows);
  } catch (error) {
    console.error("getPassword", error);
    res.status(500).send({
      message: "Ocorreu um erro.",
    });
  }
};

exports.deletePassword = async (req, res) => {
  try {
    const { rows } = await db.query(
      `delete 
       FROM password
       where id = ${req.params.id}`
    );
    res.status(200).send(rows);
  } catch (error) {
    console.error("getPassword", error);
    res.status(500).send({
      message: "Ocorreu um erro.",
    });
  }
};

exports.markPasswordAsComplete = async (req, res) => {
  try {
    const { rows } = await db.query(
      `UPDATE password
       SET already_attended = true
       WHERE id = ${parseInt(req.params.id)}`
    );
    res.status(200).send({ success: true });
  } catch (error) {
    console.error("markPasswordAsComplete", error);
    res.status(500).send({
      message: "Ocorreu um erro.",
    });
  }
};

exports.callPassword = async (req, res) => {
  try {
    row = await db.query(`SELECT establishment FROM password where id = ${req.params.id}`);

    const { rows } = await db.query(
      `update password
        set currently_calling = true
      where id = ${req.params.id}`
    );
    res.status(200).send(rows);

    const { rows2 } = await db.query(
      `update password
        set currently_calling = false
      where establishment = ${row.rows[0].establishment}
       and id NOT in (${req.params.id})`
    );
    res.status(200).send(rows2);
  } catch (error) {
    console.error("getPassword", error);
    res.status(500).send({
      message: "Ocorreu um erro.",
    });
  }
};