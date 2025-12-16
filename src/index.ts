import express from "express";
import versesRouter from "./routes/verses";

const app = express();
const port = process.env.APP_PORT || 3000

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("/health", (req, res) => {
  res.json({ message: "OK" });
});

app.use("/verses", versesRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
