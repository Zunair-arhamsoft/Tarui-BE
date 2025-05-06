'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Check if the column already exists
      const tableDescription = await queryInterface.describeTable('Transactions');

      if (!tableDescription.prevBalance) {
        await queryInterface.addColumn(
          'Transactions',
          'prevBalance',
          {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
            comment: 'Cumulative balance before this transaction'
          },
          { transaction }
        );
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Check if the column exists before trying to remove it
      const tableDescription = await queryInterface.describeTable('Transactions');

      if (tableDescription.prevBalance) {
        await queryInterface.removeColumn('Transactions', 'prevBalance', { transaction });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};