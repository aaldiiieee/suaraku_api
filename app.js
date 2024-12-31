import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import cors from "cors";

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
