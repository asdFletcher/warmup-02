'use strict';
const util = require('util');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/../public`));

app.get('/', (req,res,next) => {
  res.send('<h1>The home page</h1>');
});

app.get('/err', (req,res,next) => {
  next(`you've hit the error route`);
});

app.post('/save', (req,res,next) => {
  let data = req.body;
  res.json(data);
});

app.get('*', (req,res,next) => {
  res.status(404);
  res.statusMessage = 'page not found';
  res.render('not-found', {req: req});
});
app.use( (err, req, res, next) => {
  console.error(err);
  res.status(500);
  res.statusMessage = 'server error';
  res.render('error', {err: err});
});

module.exports = {
  app: app,
  start: ()=>{
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`server is up on port: ${port}`));
  },
};
