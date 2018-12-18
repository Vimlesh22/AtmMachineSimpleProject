var atmFieldsService = require('../service/atmFieldsService');
function atmFieldsController()
{

};

atmFieldsController.prototype.enterMoneyInAtmController = (req,res,next) => {
    var currencyDenomination = req.body.currencyDenomination;
    var count = req.body.count;
    atmFieldsService.enterMoneyInAtmService(currencyDenomination,count,(result,err) => {
        if(!err && result != undefined){
            res.status(200).json({
                message : "Saved Successfully",
                result : result
            });
        }else{
            res.status(400).json({
                error : err
            })
        }
    });
}

module.exports = new atmFieldsController();