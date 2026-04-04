import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { db } from "./config/db.config.js";

import authUser from "./routes/auth.route.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use("/api/auth", authUser);

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
