const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
    countryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'country'
    },
    stateId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'state'
    },
    name : {
        type: String,
        required : true
    }
});

const city = mongoose.model('city',citySchema);
module.exports = city;