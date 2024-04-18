const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
});

const country1 = mongoose.model('country',countrySchema);
module.exports = country1;