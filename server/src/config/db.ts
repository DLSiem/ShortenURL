import { Sequelize } from "sequelize";

const { PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT } = process.env;

const sequelize = new Sequelize(
  PGDATABASE as string,
  PGUSER as string,
  PGPASSWORD as string,
  {
    host: PGHOST,
    port: Number(PGPORT),
    dialect: "postgres",
    logging: false,
  }
);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default sequelize;
