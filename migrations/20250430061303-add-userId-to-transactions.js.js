'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Transactions');
    if (!table.userId) {
      await queryInterface.addColumn('Transactions', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      });
    }
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Transactions', 'userId');
  },
};
