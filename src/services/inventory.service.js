/* eslint-disable no-await-in-loop */
const { Sequelize } = require('sequelize');
const { Category, Item } = require('../models');
const httpUtils = require('../utils/http.utils');

const storeCategoryItem = async (category) => {
  const categories = await httpUtils.httpGet(`https://backend-evaluation-lgsvu.ondigitalocean.app/category?name=${category}`);
  let itemArray = categories.itemMetadata;
  itemArray = itemArray.map((items) => items.id);
  const storeInCategory = await Category.create({ category: categories.name, items: itemArray });

  let featureList = itemArray.map((item) => httpUtils.httpGet(`https://backend-evaluation-lgsvu.ondigitalocean.app/items/${item}`));
  featureList = await Promise.all(featureList);
  featureList = featureList.map((item) => item.features);
  let storeInItem;
  for (let i = 0; i < itemArray.length; i++) {
    storeInItem = await Item.create({
      category: categories.name,
      item: itemArray[i],
      color: featureList[i][0].value,
      size: featureList[i][1].value,
      brand: featureList[i][2].value,
    });
  }
  return 'stored';
};

const distinctFeat = async (category) => {
  const result = await Category.findOne({ where: { category } });
  if (!result) return 'No Such Category';
  const output = { features: {} };
  let item = await Item.findAll({
    attributes: ['size'],
    group: ['size'],
    where: { category },
  });
  item = item.map((feat) => feat.size);
  output.features.size = item;
  item = await Item.findAll({
    attributes: ['color'],
    group: ['color'],
    where: { category },
  });
  item = item.map((feat) => feat.color);
  output.features.color = item;
  item = await Item.findAll({
    attributes: ['brand'],
    group: ['brand'],
    where: { category },
  });
  item = item.map((feat) => feat.brand);
  output.features.brand = item;
  return output;
};
module.exports = {
  storeCategoryItem,
  distinctFeat,
};
