// Module dependencies

const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReportSchema = new Schema({
  webhookHitCount: {
    type: Number
  },
  filterPassedCount: {
    type: Number
  },
  SMSSentCount: {
    type: Number
  }
});

mongoose.model('report', ReportSchema);