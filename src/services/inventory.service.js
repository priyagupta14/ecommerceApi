/* eslint-disable no-await-in-loop */
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
// // let categoryArray = categories.map((category) => httpUtils.httpGet(`https://backend-evaluation-lgsvu.ondigitalocean.app/category?name=${category}`));
// // categoryArray = await Promise.all(categoryArray);
// let itemArray = categoryArray.map((category) => category.itemMetadata);
// itemArray = itemArray.map((items) => items.map((item) => item.id));// list of all items
// // console.log(itemArray);
// categoryArray = categoryArray.map((category) => category.name);
// // console.log(categoryArray);
// const storeInCategory = 0;
// // for (let i = 0; i < categoryArray.length; i++) {
// //   storeInCategory = await Category.create({ category: categoryArray[i], items: itemArray[i] });
// //   console.log(18, storeInCategory);
// // }
// let featureList = itemArray.map((items) => items.map((item) => httpUtils.httpGet(`https://backend-evaluation-lgsvu.ondigitalocean.app/items/${item}`)));
// featureList = await Promise.all(featureList.map((item) => Promise.all(item)));
// featureList = featureList.map((items) => items.map((item) => item.features));
// console.log(23, featureList[1][0]);
// const arr = itemArray.concat(featureList);
// console.log(25, arr.length);
// categoryArray;
};
module.exports = {
  storeCategoryItem,
};
