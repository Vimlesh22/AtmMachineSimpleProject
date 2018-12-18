const mongoose = require('mongoose');

function atmFieldsModel(){

};

var atmFieldsSchema = mongoose.Schema({
    currencyDenomination : Number,
    count : Number
  });

  var atmFields = mongoose.model('atmFields',atmFieldsSchema);

  atmFieldsModel.prototype.enterMoneyInAtmModel = function(currencyDenomination,count,callback){
      var AtmFields = new atmFields({
        currencyDenomination : currencyDenomination,
        count : count
      });

      AtmFields.save().then((result,err) => {
          if(!err && result != undefined){
              callback(result);
          }else{
              callback(null,err);
          }
      });
  }

  module.exports = new atmFieldsModel();