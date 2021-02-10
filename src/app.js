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
app.use("/api/", usersRoute);
app.use("/api/", passwordRoute);

module.exports = app;
