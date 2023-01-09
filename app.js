const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors());

app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true, parameterLimit: 200000 }));

global.__basedir = __dirname;

const routes = require('./routes');

Object.keys(routes).forEach((route) => {
  app.use('/api/v1', routes[route]);
})

module.exports = app