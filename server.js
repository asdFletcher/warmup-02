'use strict';

const express = require('express');
const app = express();

// set the view engine
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

// statics
app.use(express.static(`${__dirname}/../public`));

app.use(express.json());

app.get('/', (req,res,next) => {
  console.log('home route hit');
  res.status(200).send('home route hit');
});

app.post('/save', (req,res,next) => {
  console.log('save route hit');
  res.status(200).json(req.body);
});

app.get('/err', (req,res,next) => {
  console.log('err route hit');
  next('error detected!');
});

app.use('*', (req,res,next) =>{
  console.log('404 route hit');
  res.status(404);
  res.statusMessage = 'page not found';
  res.render('not-found', {req: req});
});

app.use( (err,req,res,next) =>{
  res.status(500);
  res.statusMessage = 'internal server error';
  res.render('error', {req: req, err: err});
});

module.exports = {
  server: app,
  start: () => {
    const PORT = process.env.PORT || 3000;
    app.listen( PORT, () => console.log(`server up and listening on port: ${PORT}`));
  },
};
