import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("Urls", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      originalUrl: {
        type: DataTypes.STRING(2048),
        allowNull: false,
      },
      shortUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clicks: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("Urls");
  },
};
