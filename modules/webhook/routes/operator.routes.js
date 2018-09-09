const operatorController = require('../controllers/operator.contoller');

module.exports = (app) => {
  app.route('/api/operator').get(operatorController.fetchOperators);
  app.route('/api/operator').post(operatorController.createOperator);
}