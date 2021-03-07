const { healthHandler } = require('./health.handler');
const { storeCategoryItem, distinctFeat } = require('./inventory.handler');

module.exports = {
  healthHandler,
  storeCategoryItem,
  distinctFeat,
};
