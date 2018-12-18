const express = require('express');
const app = express();
const routes = require('./routes/routes');
const model = require('./model/connection');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000 ;

app.use('/api',bodyParser.urlencoded({extended: true}));
app.use('/api',bodyParser.json());
app.use('/api',routes);
app.listen(PORT,() => {
    model.createConnection();
    console.log('Listening on Port '+PORT);
});