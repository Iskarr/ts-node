import express from "express";
import newsRoutes from "./routes/newsRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()).use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", newsRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
