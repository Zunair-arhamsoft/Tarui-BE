'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Transactions');
    if (!table.ledgerId) {
      await queryInterface.addColumn('Transactions', 'ledgerId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Ledgers',
          key: 'id',
        },
        onDelete: 'CASCADE',
      });
    }
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Transactions', 'ledgerId');
  },
};
