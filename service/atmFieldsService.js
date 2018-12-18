const atmFieldsModel = require('../model/atmFieldsModel');
const async = require('async');

// function atmFieldsService (){

// };

// atmFieldsService.prototype.enterMoneyInAtmService = function(currencyDenomination,count,callback){
//     atmFieldsModel.enterMoneyInAtmModel(currencyDenomination,count,(serviceCalled,err) => {
//         if(!err && serviceCalled != undefined){
//             callback(serviceCalled);
//         }else{
//             callback(null,err);
//         }
//     });
// };

// module.exports = new atmFieldsService();

exports.addAtmData = (data, callback) => {
    var operations = [];
    for (var i = 0; i < data.length; i++) {
        operations.push((function (atmData) {
            return function (cb) {
                atmFieldsModel.save(atmData, (error, result) => {
                    if (error) {
                        cb(error);
                    } else {
                        cb(null, result);
                    }
                })
            }
        })(data[i]))
    }
    async.series(operations, (error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
}