'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "Products",
      "value",
      {
        type: Sequelize.DataTypes.FLOAT
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Products", "value");
  }
};
