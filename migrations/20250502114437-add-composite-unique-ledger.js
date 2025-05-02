module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, remove the old unique constraint on 'name' (if exists)
    await queryInterface.removeConstraint('Ledgers', 'Ledgers_name_key').catch(() => { });

    // Add the composite unique constraint on userId + name
    await queryInterface.addConstraint('Ledgers', {
      fields: ['userId', 'name'],
      type: 'unique',
      name: 'user_ledger_unique_constraint',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove composite constraint
    await queryInterface.removeConstraint('Ledgers', 'user_ledger_unique_constraint');

    // Re-add global unique on name (optional, only if needed again)
    await queryInterface.addConstraint('Ledgers', {
      fields: ['name'],
      type: 'unique',
      name: 'Ledgers_name_key',
    });
  },
};
