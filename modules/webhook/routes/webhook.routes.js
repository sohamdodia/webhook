const webhookController = require('../controllers/webhook.controller');

module.exports = (app) => {
  app.route('/api/webhook').post(webhookController.handleWebhook);
  app.route('/api/report').get(webhookController.fetchReport);
}