const mongoose = require('mongoose');

var transactionFieldsSchema = mongoose.Schema({
    card_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cardsFields',
        required: [true, 'card Id is required field']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
    },
    timeStamp: {
        type: Date,
        required: [true, 'timeStamp is required'],
    }
});

var transactionFields = mongoose.model('transactionFields', transactionFieldsSchema);

function transactionFieldsModel() {

};

transactionFieldsModel.prototype.save = (data, callback) => {
    var newData = new transactionFields(data);
    newData.save(newData, (error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
}

module.exports = new transactionFieldsModel();
