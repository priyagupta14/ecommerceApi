const sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Categories', 'category', {
      type: sequelize.STRING,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Categories', 'category', {
      type: sequelize.STRING,
      unique: false,
    });
  },
};
