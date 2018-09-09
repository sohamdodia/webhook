// Module dependencies

const mongoose = require('mongoose');

const { Schema } = mongoose;

const RuleSchema = new Schema({
  companyId: {
    type: Schema.ObjectId,
    ref: 'company'
  },
  operatorId: {
    type: Schema.ObjectId,
    ref: 'operator'
  },
  value: {
    type: String
  },
  field: {
    type: String
  },
  phoneNumberField: {
    type: String
  },
  smsBody: {
    type: String
  }
});

mongoose.model('rule', RuleSchema);