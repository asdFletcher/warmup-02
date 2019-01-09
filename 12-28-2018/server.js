'use strict';

const express = require('express');
let app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');


// static routes
app.use(express.static(`${__dirname}/public}`));

// app middleware
app.use(express.json());



app.get('/', (req,res) => {
    res.send('<h1>hello from the home route</h1>');
});

app.post('/save', (req,res) => {
    res.json(req.body);
});

app.get('/err', (req,res,next) => {
    next('There was a catastrophic error.');
});

app.get('*', (req,res) => {
    res.status(404);
    res.statusMessage = 'Page not found';
    res.render('not-found', {request: req});
});

app.use( (err,req,res,next) => {
    res.status(500);
    res.statusMessage = 'Server Error';
    res.render('error', {request: req, error: err});
})


// app.listen (8080, ()=> console.log('server up on 8080'));

module.exports = {
    server: app,
    start: (port) => {
        app.listen( port, () => console.log(`listening on port ${port}`));
    }
}
