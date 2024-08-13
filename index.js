import express from "express";
import "dotenv/config";
import "./config/db.js";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import { router as productRouter } from "./router/products.js";
import { router as usersRouter } from "./router/users.js";

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, (err) => {
  console.log(
    err
      ? `Error launching server: ${err.message}`
      : `Server running on port http://127.0.0.1:${PORT} \n
    Ctrl + C to exit...`
  );
});

app.use("/api/product", productRouter);
app.use("/api/users", usersRouter);