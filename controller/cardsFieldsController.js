var cardsFieldsService = require('../service/cardsFieldsService');

exports.addUsersCardDetails = (req, res) => {
    var responseResult = {};
    req.checkBody('cardNumber', `Card Number is required`).notEmpty();
    req.checkBody('pin', `Pin is required`).notEmpty();
    req.checkBody('balance', `Balance is required`).notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        responseResult.status = false;
        responseResult.message = errors[0].msg;
        return res.status(400).send(responseResult);
    } else {
        cardsFieldsService.checkCardExists(req.body, (error, result) => {
            if (error) {
                responseResult.status = false;
                responseResult.message = "Internal Server Error";
                return res.status(500).send(responseResult);
            } else if (result != null) {
                responseResult.status = false;
                responseResult.message = "Card number taken by another user";
                return res.status(409).send(responseResult);
            } else {
                cardsFieldsService.addCardDetails(req.body, (error, result) => {
                    if (error) {
                        responseResult.status = false;
                        responseResult.message = "Internal Server Error";
                        return res.status(500).send(responseResult);
                    } else {
                        responseResult.status = true;
                        responseResult.message = "Successfully saved";
                        responseResult.result = result;
                        return res.status(200).send(responseResult);
                    }
                })
            }
        })

    }
}

exports.checkCardCredentials = (req, res) => {
    var responseResult = {};
    req.checkBody('cardNumber', `Card Number is required`).notEmpty();
    req.checkBody('pin', `Pin is required`).notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        responseResult.status = false;
        responseResult.message = errors[0].msg;
        return res.status(400).send(responseResult);
    } else {
        cardsFieldsService.checkCardExists(req.body, (error, result) => {
            if (error) {
                responseResult.status = false;
                responseResult.message = "Internal Server Error";
                return res.status(500).send(responseResult);
            } else if (result == null) {
                responseResult.status = false;
                responseResult.message = "Not a registered user";
                return res.status(404).send(responseResult);
            } else {
                cardsFieldsService.checkCardCredentials(req.body, (error, result) => {
                    if (error) {
                        responseResult.status = false;
                        responseResult.message = "Internal Server Error";
                        return res.status(500).send(responseResult);
                    } else if (result == null) {
                        responseResult.status = false;
                        responseResult.message = "Entered wrong Card number or Pin";
                        return res.status(401).send(responseResult);
                    } else {
                        responseResult.status = false;
                        responseResult.message = "Success";
                        responseResult.result = result;
                        return res.status(200).send(responseResult);
                    }
                })
            }
        })

    }
}

exports.checKAmountsentPresent = (req, res) => {
    var responseResult = {};
    req.checkBody('_id', `Card id is required`).notEmpty();
    req.checkBody('cardNumber', `Card Number is required`).notEmpty();
    req.checkBody('amount', `Amount is required`).notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        responseResult.status = false;
        responseResult.message = errors[0].msg;
        return res.status(400).send(responseResult);
    } else {
        cardsFieldsService.checkCardById(req.body, (error, result) => {
            if (error) {
                responseResult.status = false;
                responseResult.message = "Internal Server Error";
                return res.status(500).send(responseResult);
            } else if (result == null) {
                responseResult.status = false;
                responseResult.message = "Card doesn't exists";
                return res.status(404).send(responseResult);
            } else if (req.body.amount > result.balance) {
                responseResult.status = false;
                responseResult.message = "Balance less than requested amount";
                return res.status(400).send(responseResult);
            } else if (req.body.amount % 100 != 0) {
                responseResult.status = false;
                responseResult.message = "Please enter amount multiple of hundred";
                return res.status(400).send(responseResult);
            } else if (req.body.amount <= result.amount) {
                responseResult.status = false;
                responseResult.message = "Entered amount ";
                return res.status(400).send(responseResult);
            } else {
                cardsFieldsService.checkCardAndUpdate(req.body, (error, result) => {
                    if (error) {
                        responseResult.status = false;
                        responseResult.message = "Internal Server Error";
                        return res.status(500).send(responseResult);
                    } else {
                        responseResult.status = false;
                        responseResult.message = "Success";
                        responseResult.result = result;
                        return res.status(200).send(responseResult);
                    }
                })
            }
        })
    }
}
// function cardsFieldsController()
// {

// };

// cardsFieldsController.prototype.createNewCard = (req,res,next) => {
//     var cardNumber = req.body.cardNumber;
//     var pin = req.body.pin;
//     var balance = req.body.balance; 
//     cardsFieldsService.createNewCardService(cardNumber,pin,balance,(result,err) => {
//         if(!err && result != undefined){
//             res.status(200).json({
//                 message : "Saved Successfully",
//                 id : result._id
//             });
//         }else{
//             res.status(400).json({
//                 error : err
//             })
//         }
//     });
// }


// cardsFieldsController.prototype.getCardDataController = (req,res,next) => {
//     var cardNumber = req.body.cardNumber;
//     var  pin = req.body.pin;
//     cardsFieldsService.getCardDataService(cardNumber,pin,(result,err) => {
//         if(!err && result != undefined){
//             res.status(200).json({
//                 message : "Data Fetched Successfully",
//                 result : result
//             });
//         }else{
//             res.status(400).json({
//                 error : err
//             })
//         }
//     });
// }
// module.exports = new cardsFieldsController();