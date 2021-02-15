const express = require("express");
const cors = require("cors");

const app = express();

// ==> Rotas da API (Employee):
const index = require("./routes/index");
const usersRoute = require("./routes/users");
const passwordRoute = require("./routes/password");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(cors());

app.use(index);

const baseUrl = '/api'
app.use(`${baseUrl}/users`, usersRoute);
app.use(`${baseUrl}/password`, passwordRoute);

module.exports = app;
