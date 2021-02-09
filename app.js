require('dotenv').config()
const express = require('express');
const userRouter = require('./routes/users');

const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

const baseUrl = '/api';
app.use(`${baseUrl}/users`, userRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});