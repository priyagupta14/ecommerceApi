const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
    }
  }
  Category.init({
    category: DataTypes.STRING,
    items: DataTypes.ARRAY(DataTypes.STRING),
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
