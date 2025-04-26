'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDefinition = await queryInterface.describeTable('Ledgers');

    if (!tableDefinition.name.unique) {
      await queryInterface.changeColumn('Ledgers', 'name', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableDefinition = await queryInterface.describeTable('Ledgers');

    if (tableDefinition.name.unique) {
      await queryInterface.changeColumn('Ledgers', 'name', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false, // Remove unique
      });
    }
  }
};
