"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove 'price' column only if it exists
    const table = "Products";
    const column = "price";

    const [results] = await queryInterface.sequelize.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = '${table}' AND column_name = '${column}'
    `);

    if (results.length > 0) {
      await queryInterface.removeColumn(table, column);
      console.log(`Column '${column}' removed from '${table}'`);
    } else {
      console.log(`Column '${column}' does not exist in '${table}'`);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Re-add 'price' column in case of rollback
    await queryInterface.addColumn("Products", "price", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    });
  },
};
