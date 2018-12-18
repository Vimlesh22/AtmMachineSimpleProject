const cardsFieldsModel = require('../model/cardsFieldsModel');
const transactionFieldsModel = require('../model/transactionFieldsModel');

exports.addCardDetails = (data, callback) => {
    cardsFieldsModel.save(data, (error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
}

exports.checkCardCredentials = (data, callback) => {
    cardsFieldsModel.findOne(data, (error, result) => {
        if(error){
            callback(error);
        } else {
            callback(null, result);
        }
    })
}

exports.checkCardExists = (data, callback) => {
    var card_data = {
        cardNumber: data.cardNumber
    }
    cardsFieldsModel.findOne(card_data, (error, result) => {
        if(error){
            callback(error);
        } else {
            callback(null, result);
        }
    })
}

// function cardsFieldsService (){

// };

// cardsFieldsService.prototype.createNewCardService = (cardNumber,pin,balance,callback) => {
//     cardsFieldsModel.createNewCardModel(cardNumber,pin,balance,(serviceCalled,err) => {
//         if(!err && serviceCalled != undefined){
//             transactionFieldsModel.addTotalBalance(balance);
//             callback(serviceCalled);
//         }else{
//             callback(null,err);
//         }
//     });
// };

// cardsFieldsService.prototype.getCardDataService = (cardNumber,pin,callback) => {
//     cardsFieldsModel.getCardDataModel(cardNumber,pin,(serviceCalled,err) => {
//         if(!err && serviceCalled != undefined){
//             callback(serviceCalled);
//         }else{
//             callback(null,err);
//         }
//     });
// }


// module.exports = new cardsFieldsService();