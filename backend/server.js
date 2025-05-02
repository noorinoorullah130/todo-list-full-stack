import express from "express";
import cors from "cors";

const app = express();

import todoRoutes from "./routes/todoRoutes.js";

app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);

app.listen(5000, () =>
    console.log("Server is running on http://localhost:5000")
);
