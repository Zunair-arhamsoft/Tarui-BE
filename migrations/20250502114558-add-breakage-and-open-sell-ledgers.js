'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { User, Ledger } = require('../api/models/index');

    const users = await User.findAll();

    for (const user of users) {
      const existingLedgers = await Ledger.findAll({
        where: { userId: user.id },
        attributes: ['name'],
      });

      const ledgerNames = existingLedgers.map(l => l.name);

      const promises = [];

      if (!ledgerNames.includes('Breakage')) {
        promises.push(
          Ledger.create({
            name: 'Breakage',
            userId: user.id,
            description: 'Ledger for breakage',
          })
        );
      }

      if (!ledgerNames.includes('Open Sell')) {
        promises.push(
          Ledger.create({
            name: 'Open Sell',
            userId: user.id,
            description: 'Ledger for open sell',
          })
        );
      }

      await Promise.all(promises);
    }
  },

  down: async (queryInterface, Sequelize) => {
    const { Ledger } = require('../api/models/index');

    await Ledger.destroy({
      where: {
        name: ['Breakage', 'Open Sell'],
      },
    });
  },
};
