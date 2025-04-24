'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable("Ledgers");

    if (!tableInfo.description) {
      await queryInterface.addColumn("Ledgers", "description", {
        type: Sequelize.STRING,
        allowNull: false,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable("Ledgers");

    if (tableInfo.description) {
      await queryInterface.removeColumn("Ledgers", "description");
    }
  },
};

