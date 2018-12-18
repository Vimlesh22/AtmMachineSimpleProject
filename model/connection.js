const mongoose = require('mongoose');
const config = require('../config');

function connection() {
    return mongoose.connect(config.database,{useNewUrlParser: true});
  
    var db = mongoose.connection;
    db.once('open',() => {
      console.log('Connected to database');
    });
    db.on('error',console.error.bind(console,'connection error'));
  }

module.exports = {
    createConnection : connection
  };
  
 