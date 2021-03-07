const express = require('express');
const { storeCategoryItem } = require('../handlers');

const router = express.Router();

router.put('/category/', storeCategoryItem);
module.exports = {
  router,
};
