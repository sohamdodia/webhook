const Joi = require('joi');

exports.createCompany = Joi.object({
  name: Joi
          .string()
          .required()
          .options({
            language: {
              any: {
                empty: 'is required'
              }
            }
          })
          .label('Name')
});