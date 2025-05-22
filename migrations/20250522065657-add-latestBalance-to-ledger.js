"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableName = "Ledgers";
    const columnName = "latestBalance";

    // Check if column already exists (works for Postgres)
    const tableDefinition = await queryInterface.describeTable(tableName);
    if (!tableDefinition[columnName]) {
      await queryInterface.addColumn(tableName, columnName, {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableName = "Ledgers";
    const columnName = "latestBalance";

    // Only remove if exists
    const tableDefinition = await queryInterface.describeTable(tableName);
    if (tableDefinition[columnName]) {
      await queryInterface.removeColumn(tableName, columnName);
    }
  },
};
