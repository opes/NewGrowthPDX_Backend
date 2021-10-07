const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(
  require('cors')({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use('/auth', require('../lib/controllers/auth'));
app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
