"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const tableName = "Transactions";
        const columnName = "type";

        // Step 1: Rename existing 'Return' to 'Return-In'
        await queryInterface.sequelize.query(`
      UPDATE "${tableName}"
      SET "${columnName}" = 'Return-In'
      WHERE "${columnName}" = 'Return'
    `);

        // Step 2: Alter the ENUM to replace 'Return' with 'Return-In' and add 'Return-Out'
        // To do this safely, we create a new enum type, change the column to use it, and drop the old one.

        await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_"${tableName}"_"${columnName}"') THEN
          CREATE TYPE "enum_${tableName}_${columnName}_new" AS ENUM (
            'Buy', 'Sell', 'Open Sell', 'Return-In', 'Return-Out', 'Breakage', 'Credit Amount', 'Debit Amount'
          );

          ALTER TABLE "${tableName}"
          ALTER COLUMN "${columnName}" TYPE "enum_${tableName}_${columnName}_new"
          USING "${columnName}"::text::"enum_${tableName}_${columnName}_new";

          DROP TYPE "enum_${tableName}_${columnName}";

          ALTER TYPE "enum_${tableName}_${columnName}_new"
          RENAME TO "enum_${tableName}_${columnName}";
        END IF;
      END$$;
    `);
    },

    down: async (queryInterface, Sequelize) => {
        const tableName = "Transactions";
        const columnName = "type";

        // Revert all 'Return-In' to 'Return'
        await queryInterface.sequelize.query(`
      UPDATE "${tableName}"
      SET "${columnName}" = 'Return'
      WHERE "${columnName}" = 'Return-In'
    `);

        // Revert ENUM to original values
        await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_"${tableName}"_"${columnName}"') THEN
          CREATE TYPE "enum_${tableName}_${columnName}_old" AS ENUM (
            'Buy', 'Sell', 'Open Sell', 'Return', 'Breakage', 'Credit Amount', 'Debit Amount'
          );

          ALTER TABLE "${tableName}"
          ALTER COLUMN "${columnName}" TYPE "enum_${tableName}_${columnName}_old"
          USING "${columnName}"::text::"enum_${tableName}_${columnName}_old";

          DROP TYPE "enum_${tableName}_${columnName}";

          ALTER TYPE "enum_${tableName}_${columnName}_old"
          RENAME TO "enum_${tableName}_${columnName}";
        END IF;
      END$$;
    `);
    },
};
