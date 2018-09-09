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
          .label('Name'),
  fn: Joi
        .string()
        .required()
        .options({
          language: {
            any: {
              empty: 'is required'
            }
          }
        })
        .label('Function')
});

exports.createRule = Joi.object({
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
  operatorId: Joi
                .string()
                .required()
                .options({
                  language: {
                    any: {
                      empty: 'is required'
                    }
                  }
                })
                .label('Operator Id'),
  value: Joi
          .string()
          .required()
          .options({
            language: {
              any: {
                empty: 'is required'
              }
            }
          })
          .label('Value'),
  field: Joi
          .string()
          .required()
          .options({
            language: {
              any: {
                empty: 'is required'
              }
            }
          })
          .label('Field'),
  phoneNumberField: Joi
                      .string()
                      .required()
                      .options({
                        language: {
                          any: {
                            empty: 'is required'
                          }
                        }
                      })
                      .label('Phone Number Field'),
  smsBody: Joi
            .string()
            .required()
            .options({
              language: {
                any: {
                  empty: 'is required'
                }
              }
            })
            .label('SMs Body')
});