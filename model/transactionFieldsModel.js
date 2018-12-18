const mongoose = require('mongoose');

function transactionFieldsModel(){

};

var subSchema = mongoose.Schema({
    cardNumber : {
        type : Number
    } ,
    amount : {
        type : Number
    }
});

var transactionFieldsSchema = mongoose.Schema({
    totalAvailableBalance : {
        type : Number
    },
    transactions : [subSchema]
  });

  var transactionFields = mongoose.model('transactionFields',transactionFieldsSchema);

  

  module.exports = new transactionFieldsModel();