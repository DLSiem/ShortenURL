// import { SequelizeOptions } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

const config = {
  development: {
    database: process.env.DB_NAME,
    dialect: "postgres",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    logging: false,
  },
  test: {
    database: process.env.DB_NAME_TEST,
    dialect: "postgres",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    logging: false,
  },
  production: {
    database: process.env.DB_NAME,
    dialect: "postgres",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    logging: false,
  },
};

export default config;
