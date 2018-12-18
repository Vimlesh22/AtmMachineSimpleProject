var atmFieldsService = require('../service/atmFieldsService');
// function atmFieldsController()
// {

// };

// atmFieldsController.prototype.enterMoneyInAtmController = (req,res,next) => {
//     var currencyDenomination = req.body.currencyDenomination;
//     var count = req.body.count;
//     atmFieldsService.enterMoneyInAtmService(currencyDenomination,count,(result,err) => {
//         if(!err && result != undefined){
//             res.status(200).json({
//                 message : "Saved Successfully",
//                 result : result
//             });
//         }else{
//             res.status(400).json({
//                 error : err
//             })
//         }
//     });
// }

// module.exports = new atmFieldsController();

exports.addAtmData = (req, res) => {
    var responseResult = {};
    for (var i = 0; i < req.body.data; i++) {
        req.checkBody(['data', i, 'currencyDenomination'], `Currency Denomination is required`).notEmpty();
        req.checkBody(['data', i, 'count'], `Count is required`).notEmpty();
    }
    var errors = req.validationErrors();
    if (errors) {
        responseResult.status = false;
        responseResult.message = errors[0].msg;
        return res.status(400).send(responseResult);
    } else {
        atmFieldsService.addAtmData(req.body.data, (error, result) => {
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

}