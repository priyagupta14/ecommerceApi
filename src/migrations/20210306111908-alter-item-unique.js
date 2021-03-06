module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Items', 'item', {
      type: Sequelize.STRING,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Items', 'item', {
      type: Sequelize.STRING,
      unique: false,
    });
  },
};
