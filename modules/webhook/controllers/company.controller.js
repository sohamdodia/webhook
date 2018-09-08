const mongoose = require('mongoose');
const Joi = require('joi');

const helper = require('../../../helper');
const schema = require('../../../schema');

const Company = mongoose.model('company');

exports.createCompany = async (req, res) => {
  try {
    const validationResult = Joi.validate(req.body, schema.createCompany, { abortEarly: false });

    if (validationResult.error) {
      return res.status(400).send(helper.getCustomErrorMessage(
        validationResult.error, validationResult.error.details[0].message,
      ));
    }

    const company = new Company(req.body);
    const createdCompany = await company.save();

    return res.status(200).send(helper.getCustomSuccessMessage(createdCompany));
  } catch (error) {
    console.log({error});
    return res.status(500).send(helper.getCustomErrorMessage());
  }
};

exports.fetchCompanies = async (req, res) => {
  try {
    const retrievedCompany = await Company.find({});

    return res.status(200).send(helper.getCustomSuccessMessage(retrievedCompany));
  } catch (error) {
    return res.status(500).send(helper.getCustomErrorMessage()); 
  }
};