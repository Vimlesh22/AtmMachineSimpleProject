const express = require('express');
const app = express();
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const url = require('./config/config');
const cors = require('cors');
const PORT = process.env.PORT || 3000 ;

app.use('/api',bodyParser.urlencoded({extended: true}));
app.use('/api',bodyParser.json());
app.use('/api',routes);
app.use(cors());

app.listen(PORT,() => {
    console.log('Listening on Port '+PORT);
});

startMongo(url);                          

function startMongo() {
    const mongoose = require('mongoose');        
    mongoose.connect(url, { useCreateIndex: true, useNewUrlParser: true }); 
    const db = mongoose.connection;              

    db.on('error', () => {                       
        console.error('connection error with mongodb...');
        process.exit(0);                       
    })

    db.once('open', () => {                       
        console.log('MongoDB is connected');
    })
}