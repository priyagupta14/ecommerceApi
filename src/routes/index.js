const { router: healthRouter } = require('./health.route');
const { router: inventoryRoute } = require('./inventory.route');

module.exports = {
  healthRouter,
  inventoryRoute,
};
