const Joi = require('joi');
const inventoryService = require('../services/inventory.service');

const storeCategoryItem = async (req, res) => {
  try {
    let categoryArray = await req.body.name.map(
      (category) => inventoryService.storeCategoryItem(category),
    );
    categoryArray = await Promise.all(categoryArray);
    res.status(201).json(categoryArray);
  } catch (error) {
    res.status(404).json({ ErrorMessage: error.name });
  }
};

const distinctFeat = async (req, res) => {
  const schema = Joi.object().keys({
    category: Joi.string().required(),
  });
  const validate = schema.validate(req.params);
  if (validate.error) return res.status(400).json({ Error: 'invalid params' });
  try {
    const result = await inventoryService.distinctFeat(req.params.category);
    res.status(202).json({ message: result });
  } catch (error) {
    res.status(400).json({ Error: error });
  }
};
module.exports = {
  storeCategoryItem,
  distinctFeat,
};
