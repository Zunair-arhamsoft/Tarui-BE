"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the index already exists before adding
    await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes 
          WHERE tablename = 'Products' 
          AND indexname = 'user_product_unique_constraint'
        ) THEN
          ALTER TABLE "Products"
          ADD CONSTRAINT user_product_unique_constraint
          UNIQUE ("name", "description", "userId");
        END IF;
      END$$;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Check if the constraint exists before removing
    await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM pg_constraint 
          WHERE conname = 'user_product_unique_constraint'
        ) THEN
          ALTER TABLE "Products"
          DROP CONSTRAINT user_product_unique_constraint;
        END IF;
      END$$;
    `);
  },
};
