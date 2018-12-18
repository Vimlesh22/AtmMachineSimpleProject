var cardsFieldsService = require('../service/cardsFieldsService');
function cardsFieldsController()
{

};

cardsFieldsController.prototype.createNewCard = (req,res,next) => {
    var cardNumber = req.body.cardNumber;
    var pin = req.body.pin;
    var balance = req.body.balance; 
    cardsFieldsService.createNewCardService(cardNumber,pin,balance,(result,err) => {
        if(!err && result != undefined){
            res.status(200).json({
                message : "Saved Successfully",
                id : result._id
            });
        }else{
            res.status(400).json({
                error : err
            })
        }
    });
}


cardsFieldsController.prototype.getCardDataController = (req,res,next) => {
    var cardNumber = req.body.cardNumber;
    var  pin = req.body.pin;
    cardsFieldsService.getCardDataService(cardNumber,pin,(result,err) => {
        if(!err && result != undefined){
            res.status(200).json({
                message : "Data Fetched Successfully",
                result : result
            });
        }else{
            res.status(400).json({
                error : err
            })
        }
    });
}


module.exports = new cardsFieldsController();