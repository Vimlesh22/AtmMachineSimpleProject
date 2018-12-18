var atmFieldsModel = require('../model/atmFieldsModel');

function atmFieldsService (){

};

atmFieldsService.prototype.enterMoneyInAtmService = function(currencyDenomination,count,callback){
    atmFieldsModel.enterMoneyInAtmModel(currencyDenomination,count,(serviceCalled,err) => {
        if(!err && serviceCalled != undefined){
            callback(serviceCalled);
        }else{
            callback(null,err);
        }
    });
};

module.exports = new atmFieldsService();