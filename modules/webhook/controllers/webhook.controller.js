const mongoose = require('mongoose');
const request = require('request-promise');

const helper = require('../../../helper');
const message = require('../../../message');

const Rule = mongoose.model('rule');
const Report = mongoose.model('report');

exports.handleWebhook = async (req, res) => {
  try {
    let rule = await Rule.find({}).populate('operatorId');
    if (rule.length === 0) {
      return res.status(400).send(helper.getCustomErrorMessage(message.addRule));
    }
    rule = rule[0];
    const body = req.body;

    if (body[rule.field] === undefined) {
      return res.status(400).send(helper.getCustomErrorMessage(message.filterFieldNotFound));
    } else if(body[rule.phoneNumberField] === undefined ) {
      return res.status(400).send(helper.getCustomErrorMessage(message.phoneNumberFieldNotFound));
    }
    const data = {
      toNumber: body[rule.phoneNumberField],
      smsText: rule.smsBody
    }
    
    const logic = eval(rule.operatorId.fn);
    let report = await Report.find({});
    if (report.length == 0) {
      report = new Report({
        webhookHitCount: 0,
        filterPassedCount: 0,
        SMSSentCount: 0
      });

      report = await report.save();
    }
    const reportData = {
      webhookHitCount: report[0].webhookHitCount + 1,
      filterPassedCount: report[0].filterPassedCount,
      SMSSentCount: report[0].SMSSentCount
    };

    if (logic(body[rule.field], rule.value)) {
      reportData.filterPassedCount = reportData.filterPassedCount + 1;
      try {
        await request.post({
          url: 'https://leado-mini-project-api.herokuapp.com/sendSms',
          form: data,
          headers: {
            'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiU2h5YW0ifQ.a9R1PRhBuYObDt3nSrkqO58emrv4-HLbVKqfz56tf5U'
          }
        });
        reportData.SMSSentCount = reportData.SMSSentCount + 1;
      } catch (error) {
      }
    }
    await Report.findByIdAndUpdate(report[0]._id, reportData, { new: true });

    return res.status(200).send(helper.getCustomSuccessMessage());
  } catch (error) {
    return res.status(500).send(helper.getCustomErrorMessage());
  }
};

exports.fetchReport = async (req, res) => {
  try {
    const retrievedReport = await Report.find({});

    return res.status(200).send(helper.getCustomSuccessMessage(retrievedReport));
  } catch (error) {
    return res.status(500).send(helper.getCustomErrorMessage());
  }
};

