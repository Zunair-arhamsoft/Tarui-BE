module.exports = {
  up: async (queryInterface) => {
    // Remove global unique constraint on "name", if it exists
    await queryInterface.removeConstraint('Products', 'Products_name_key').catch(() => { });

    // Add composite unique constraint on userId + name
    await queryInterface.addConstraint('Products', {
      fields: ['userId', 'name'],
      type: 'unique',
      name: 'user_product_unique_constraint',
    });
  },

  down: async (queryInterface) => {
    // Remove composite constraint
    await queryInterface.removeConstraint('Products', 'user_product_unique_constraint');

    // (Optional) Restore global unique constraint on name
    await queryInterface.addConstraint('Products', {
      fields: ['name'],
      type: 'unique',
      name: 'Products_name_key',
    });
  },
};

