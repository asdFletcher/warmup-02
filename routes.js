'use strict';


function handleHome(req,res,next) {
  res.send('<h1>hello from / 😃</h1>');
};

function handleTestError(req,res,next) {
  throw 'this is a test of the error';
};

function handleSave(req,res,next) {
  let data = req.body;
  res.json(data);
};

function handleCatchAll(req,res,next) {
  res.status(404);
  res.statusMessage = "Page not found.";
  res.render('not-found', {req: req});
};

function handleError(err,req,res,next) {
  console.error(`Error:  ${err}`);
  res.status(500);
  res.statusMessage = 'Internal server error.';
  res.render('server-error', {req: req, err: err});
};



module.exports = {
  handleHome,
  handleTestError,
  handleSave,
  handleCatchAll,
  handleError,
};