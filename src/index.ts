import express from "express";
import versesRouter from "./routes/verses";

const app = express();
const port = 4444;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/verses", versesRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${process.env.APP_PORT}`);
});
