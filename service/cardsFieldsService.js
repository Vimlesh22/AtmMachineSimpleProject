const cardsFieldsModel = require('../model/cardsFieldsModel');
const transactionFieldsModel = require('../model/transactionFieldsModel');
const atmFieldModel = require('../model/atmFieldsModel');
const async = require('async');

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
        if (error) {
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
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
}

exports.checkCardById = (data, callback) => {
    var card_data = {
        _id: data._id,
        cardNumber: data.cardNumber
    }
    cardsFieldsModel.findOne(card_data, (error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
}

exports.checkCardAndUpdate = (data, callback) => {
    var card_data = {
        _id: data._id,
        cardNumber: data.cardNumber
    }
    cardsFieldsModel.findOne(card_data, (error, resultCard) => {
        if (error) {
            callback(error);
        } else {
            console.log(resultCard);
            var amount = data.amount;
            var notes = [2000, 500, 200, 100];
            var notesCount = [0, 0, 0, 0];
            for (var i = 0; i < notes.length; i++) {
                if (amount >= notes[i]) {
                    notesCount[i] = Math.floor(amount / notes[i]);
                    amount = amount % notes[i];
                }
            }
            atmFieldModel.findAll((error, result) => {
                if (error) {
                    callback(error);
                } else {
                    if (result[0].count >= notesCount[0] && result[1].count >= notesCount[1] && result[2].count >= notesCount[2] && result[3].count >= notesCount[3]) {
                        var operations = [];
                        for (var i = 0; i < result.length; i++) {
                            operations.push((function (data_atm, i) {
                                return function (cb) {
                                    var update_data = {
                                        _id: data_atm._id,
                                        count: data_atm.count - notesCount[i]
                                    }
                                    atmFieldModel.UpdateOne(update_data, (error, result) => {
                                        if (error) {
                                            cb(error);
                                        } else {
                                            cb(null, result);
                                        }
                                    })
                                }
                            })(result[i], i))
                        }
                        async.series(operations, (err, result) => {
                            if (err) {
                                callback(err);
                            } else {
                                var card_update = {
                                    _id: data._id,
                                    balance: resultCard.balance - data.amount
                                }
                                cardsFieldsModel.UpdateOne(card_update, (errorCardUpdate, resultCardUpdate) => {
                                    if(errorCardUpdate){
                                        callback(errorCardUpdate);
                                    } else {
                                        callback(null, resultCardUpdate)
                                    }
                                })
                            }
                        })
                    }
                }
            })
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