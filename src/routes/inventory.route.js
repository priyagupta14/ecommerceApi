const express = require('express');
const { storeCategoryItem, distinctFeat } = require('../handlers');

const router = express.Router();

router.put('/category/', storeCategoryItem);
router.get('/:category', distinctFeat);

module.exports = {
  router,
};
