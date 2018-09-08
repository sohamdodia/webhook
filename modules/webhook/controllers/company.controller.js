const mongoose = require('mongoose');
const Joi = require('joi');

const helper = require('../../../helper');
const schema = require('../../../schema');
const message = require('../../../message');

const Company = mongoose.model('company');
const Field = mongoose.model('field');

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
    const retrievedCompanies = await Company.find({});

    return res.status(200).send(helper.getCustomSuccessMessage(retrievedCompanies));
  } catch (error) {
    return res.status(500).send(helper.getCustomErrorMessage()); 
  }
};

exports.fetchFields = async (req, res) => {
  try {
    const validationResult = Joi.validate(req.params, schema.fetchFields, { abortEarly: false });

    if (validationResult.error) {
      return res.status(400).send(helper.getCustomErrorMessage(
        validationResult.error, validationResult.error.details[0].message,
      ));
    }

    const retrievedFields = await Field.find({ companyId: req.params.id });
    return res.status(200).send(helper.getCustomSuccessMessage(retrievedFields));
  } catch (error) {
    return res.status(500).send(helper.getCustomErrorMessage());
  }
}

exports.createOrUpdateFields = async (req, res) => {
  try {
    const validationResult = Joi.validate(req.body, schema.createOrUpdateFields, { abortEarly: false });

    if (validationResult.error) {
      return res.status(400).send(helper.getCustomErrorMessage(
        validationResult.error, validationResult.error.details[0].message,
      ));
    }
    const retrievedCompany = await Company.findById(req.body.companyId);
    if (!retrievedCompany) {
        return res.status(404).send(helper.getCustomErrorMessage(message.companyNotFound));
    }

    const retrievedRecord = await Field.findOne({ companyId: req.body.companyId });
    let createdOrUpdateField;
    if (retrievedRecord) {
      createdOrUpdateField = await Field.findOneAndUpdate({ companyId: req.body.companyId }, { fields: req.body.fields }, { new: true });
    } else {
      const field = new Field(req.body);
      createdOrUpdateField = await field.save();
    }

    return res.status(200).send(helper.getCustomSuccessMessage(createdOrUpdateField));
  } catch (error) {
    console.log({error});
    return res.status(500).send(helper.getCustomErrorMessage());
  }
};