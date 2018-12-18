const mongoose = require('mongoose');

function cardFieldsModel(){

};

var cardFieldsSchema = mongoose.Schema({
    cardNumber : Number,
    pin : Number,
    balance : Number
  });

  var cardsField = mongoose.model('cardsFields',cardFieldsSchema);

  cardFieldsModel.prototype.createNewCardModel = function(cardNumber,pin,balance,callback){
      var CardsField = new cardsField({
        cardNumber : cardNumber,
        pin : pin,
        balance : balance
      });

      CardsField.save().then((result,err) => {
          if(!err && result != undefined){
              callback(result);
          }else{
              callback(null,err);
          }
      });
  }

  cardFieldsModel.prototype.getCardDataModel = (cardNumber,pin,callback) => {
    cardsField.findOne({ cardNumber : cardNumber , pin : pin}).then((result,err) => {
        if(!err && result != undefined){
            callback(result);
        }else{
            callback(null,err);
        }
    });
  }

  module.exports = new cardFieldsModel();