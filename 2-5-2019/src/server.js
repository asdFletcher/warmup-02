'use strict';

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');


app.use(express.static(`${__dirname}/../public`));

app.use(express.json());

app.get('/', (req,res,next)=>{
  res.send('<h1>home page</h1>');
});

app.post('/save', (req,res,next)=>{
  res.json(req.body);
});

app.get('/err', (req,res,next)=>{
  next('generic error message');
});

app.get('*', (req,res,next)=>{
  res.status(404);
  res.statusMessage = 'page not found';
  res.render('not-found', {req: req});
});

app.use( (err,req,res,next) => {
  console.error(err);
  res.status(500);
  res.statusMessage = 'server error';
  res.render('error', {req: req, err: err});
});

module.exports ={
  app: app,
  start: () => {
    let port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`server running on port: ${port}`));
  }
};

