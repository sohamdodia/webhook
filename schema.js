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

exports.fetchFields = Joi.object({
  id: Joi
        .string()
        .required()
        .options({
          language: {
            any: {
              empty: 'is required'
            }
          }
        })
        .label('Company Id')
})

exports.createOrUpdateFields = Joi.object({
  companyId: Joi
              .string()
              .required()
              .options({
                language: {
                  any: {
                    empty: 'is required'
                  }
                }
              })
              .label('Company Id'),
  fields: Joi
            .array()
            .required()
            .min(1)
            .options({
              language: {
                any: {
                  empty: 'is required'
                }
              }
            })
            .label('Fields')
});

exports.createOperator = Joi.object({
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