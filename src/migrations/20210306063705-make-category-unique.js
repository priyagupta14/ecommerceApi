module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Categories', 'category', {
      type: Sequelize.STRING,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Categories', 'category', {
      type: Sequelize.STRING,
      unique: false,
    });
  },
};
