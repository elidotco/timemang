import express from "express";
const app = express();
import authRoutes from "./routes/authRoutes";

app.use(express.json());
app.use("/api/auth", authRoutes);

export default app;
