var cardsFieldsModel = require('../model/cardsFieldsModel');
var transactionFieldsModel = require('../model/transactionFieldsModel');

function cardsFieldsService (){

};

cardsFieldsService.prototype.createNewCardService = (cardNumber,pin,balance,callback) => {
    cardsFieldsModel.createNewCardModel(cardNumber,pin,balance,(serviceCalled,err) => {
        if(!err && serviceCalled != undefined){
            transactionFieldsModel.addTotalBalance(balance);
            callback(serviceCalled);
        }else{
            callback(null,err);
        }
    });
};

cardsFieldsService.prototype.getCardDataService = (cardNumber,pin,callback) => {
    cardsFieldsModel.getCardDataModel(cardNumber,pin,(serviceCalled,err) => {
        if(!err && serviceCalled != undefined){
            callback(serviceCalled);
        }else{
            callback(null,err);
        }
    });
}


module.exports = new cardsFieldsService();