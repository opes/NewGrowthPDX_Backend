const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(
  require('cors')({
    origin: true,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', require('../lib/controllers/auth'));

app.use('/api/v1/plants', require('../lib/controllers/plants'));
app.use('/api/v1/categories', require('../lib/controllers/categories'));
app.use('/api/v1/greenhouse', require('../lib/controllers/greenhouses'));

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
