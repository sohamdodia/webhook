// Module dependencies

const mongoose = require('mongoose');

const { Schema } = mongoose;

const OperatorSchema = new Schema({
  name: {
    type: 'string'
  },
  fn: {
    type: 'string'
  }
});

mongoose.model('operator', OperatorSchema);