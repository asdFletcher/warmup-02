'use strict';

// supertest

const express = require('express');

const app = express();

// views
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

// static routes
app.use(express.static(`${__dirname}/public`));

// middleware
app.use(express.json());

require('dotenv').config();

let port = process.env.PORT;

// import route handler functions
const routes = require('./routes.js');

app.get('/', routes.handleHome);

app.get('/test-the-error', routes.handleTestError);

app.post('/save', routes.handleSave);

app.get('*', routes.handleCatchAll);

app.use(routes.handleError);

// app.listen(port, ()=> console.log(`listening on port:${port}`));

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, ()=> console.log(`listening on port:${port}`));
  },
};

