const inventoryService = require('../services/inventory.service');

const storeCategoryItem = async (req, res) => {
  try {
    let categoryArray = await req.body.name.map(
      (category) => inventoryService.storeCategoryItem(category),
    );
    categoryArray = await Promise.all(categoryArray);
    // const result = await inventoryService.storeCategoryItem(req.body.name);
    console.log(666, categoryArray);
    res.status(202).json(categoryArray);
  } catch (error) {
    res.status(402).json({ ErrorMessage: error.name });
  }
};

const distinctFeat = async (req, res) => {
  const result = await inventoryService.distinctFeat(req.params.category);
  res.status(202).json(result);
};
module.exports = {
  storeCategoryItem,
  distinctFeat,
};
