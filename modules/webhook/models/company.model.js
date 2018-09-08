//Module dependencies

const mongoose = require('mongoose');

const { Schema } = mongoose;

const CompanySchema = new Schema({
    name: {
        type: String
    }
});

mongoose.model('company', CompanySchema);