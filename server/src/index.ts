import express, { Express } from "express";
import urlRoutes from "./routes/urlRoutes";
import sequelize from "./config/db";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();

const { PORT } = process.env;

app.use(express.json());
app.use(cors());

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

app.use("/", urlRoutes);
