const companyController = require('../controllers/company.controller');

module.exports = (app) => {
  app.route('/api/company').get(companyController.fetchCompanies);
  app.route('/api/company').post(companyController.createCompany);
  app.route('/api/company/fields/:id').get(companyController.fetchFields);
  app.route('/api/company/fields').post(companyController.createOrUpdateFields);
  app.route('/api/company/rule').post(companyController.createRule);
};