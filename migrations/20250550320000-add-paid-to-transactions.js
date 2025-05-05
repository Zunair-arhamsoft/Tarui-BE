"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const table = await queryInterface.describeTable("Transactions");

        if (!table.paid) {
            await queryInterface.addColumn("Transactions", "paid", {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            });
        }
    },

    down: async (queryInterface, Sequelize) => {
        const table = await queryInterface.describeTable("Transactions");

        if (table.paid) {
            await queryInterface.removeColumn("Transactions", "paid");
        }
    },
};
