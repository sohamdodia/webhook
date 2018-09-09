const mongoose = require('mongoose');
const Joi = require('joi');

const helper = require('../../../helper');
const schema = require('../../../schema');

const Operator = mongoose.model('operator');

exports.createOperator = async (req, res) => {
  try {
    const validationResult = Joi.validate(req.body, schema.createOperator, { abortEarly: false });

    if (validationResult.error) {
      return res.status(400).send(helper.getCustomErrorMessage(
        validationResult.error, validationResult.error.details[0].message,
      ));
    }

    const operator = new Operator(req.body);
    const createdOperator = await operator.save();

    return res.status(200).send(helper.getCustomSuccessMessage(createdOperator));
  } catch (error) {
    return res.status(500).send(helper.getCustomErrorMessage());
  }
}

exports.fetchOperators = async (req, res) => {
  try {

    const retrievedOperators = await Operator.find({});

    return res.status(200).send(helper.getCustomSuccessMessage(retrievedOperators));
  } catch (error) {
    return res.status(500).send(helper.getCustomErrorMessage());
  }
}