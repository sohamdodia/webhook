// Module dependencies

const mongoose = require('mongoose');

const { Schema } = mongoose;

const FieldSchema = new Schema({
  companyId: {
    type: Schema.ObjectId,
		ref: 'company'
  },
  fields: {
    type: [String]
  }
});

mongoose.model('field', FieldSchema);