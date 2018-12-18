const mongoose = require('mongoose');

var cardFieldsSchema = mongoose.Schema({
    cardNumber: {
        type: Number,
        unique: true,
        required: [true, 'Card Number is required'],
        useCreateIndex: true
    },
    pin: {
      type: Number,
      required: [true, 'Pin Number is required'],
    }, 
    balance: {
        type:Number
    } 
});

var cardsField = mongoose.model('cardsFields', cardFieldsSchema);

function cardFieldsModel() {

};

cardFieldsModel.prototype.save = (data, callback) => {
    var newData = new cardsField(data);
    newData.save(newData, (error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
}

cardFieldsModel.prototype.findOne = (data, callback) => {
    cardsField.findOne(data, (error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
}

module.exports = new cardFieldsModel();

//   cardFieldsModel.prototype.createNewCardModel = function(cardNumber,pin,balance,callback){
//       var CardsField = new cardsField({
//         cardNumber : cardNumber,
//         pin : pin,
//         balance : balance
//       });

//       CardsField.save().then((result,err) => {
//           if(!err && result != undefined){
//               callback(result);
//           }else{
//               callback(null,err);
//           }
//       });
//   }

//   cardFieldsModel.prototype.getCardDataModel = (cardNumber,pin,callback) => {
//     cardsField.findOne({ cardNumber : cardNumber , pin : pin}).then((result,err) => {
//         if(!err && result != undefined){
//             callback(result);
//         }else{
//             callback(null,err);
//         }
//     });
//   }

