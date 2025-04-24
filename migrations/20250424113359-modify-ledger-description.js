'use strict';

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if 'Ledgers' table has the 'description' column before changing
    const table = await queryInterface.describeTable('Ledgers');

    if (table.description) {
      return queryInterface.changeColumn('Ledgers', 'description', {
        type: Sequelize.TEXT,
        allowNull: false,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Ledgers');

    if (table.description) {
      return queryInterface.changeColumn('Ledgers', 'description', {
        type: Sequelize.STRING(255),
        allowNull: false,
      });
    }
  }
};
