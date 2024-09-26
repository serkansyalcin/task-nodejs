import "./config/dotenv.config.js";
import express from "express";
import { connect as databaseConnect } from "./config/database.config.js";
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static('public'))
databaseConnect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
});
