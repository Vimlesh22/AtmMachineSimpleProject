const mongoose = require('mongoose');

var atmFieldsSchema = mongoose.Schema({
    currencyDenomination: {
        type: Number,
        required: [true, 'Denomination is required'],
    },
    count: {
        type: Number,
        required: [true, 'Count is required'],
    }
});

var atmFields = mongoose.model('atmFields', atmFieldsSchema);

function atmFieldsModel() {

};

atmFieldsModel.prototype.save = (data, callback) => {
    var newData = new atmFields(data);
    newData.save(newData, (error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
}

atmFieldsModel.prototype.findAll = (callback) => {
    atmFields.find({}, (error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
}

atmFieldsModel.prototype.UpdateOne = (update_data, callback) => {
    atmFields.updateOne({_id: update_data._id }, update_data, (error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
}
module.exports = new atmFieldsModel();

//   atmFieldsModel.prototype.enterMoneyInAtmModel = function(currencyDenomination,count,callback){
//       var AtmFields = new atmFields({
//         currencyDenomination : currencyDenomination,
//         count : count
//       });

//       AtmFields.save().then((result,err) => {
//           if(!err && result != undefined){
//               callback(result);
//           }else{
//               callback(null,err);
//           }
//       });
//   }