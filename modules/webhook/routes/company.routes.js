const companyController = require('../controllers/company.controller');

module.exports = (app) => {
  app.route('/api/company').get(companyController.fetchCompanies);
  app.route('/api/company').post(companyController.createCompany);
};