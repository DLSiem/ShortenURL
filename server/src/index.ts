import express, { Express, Request, Response } from "express";

require("dotenv").config();

const app: Express = express();

const { PORT } = process.env;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
