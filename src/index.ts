import express from "express";
import pino from "pino";
import pinoHttp from "pino-http";
import versesRouter from "./routes/verses";

const logger = pino({
  transport: process.env.NODE_ENV === 'development' ? {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname',
    },
  } : undefined,
});
const app = express();
const port = process.env.APP_PORT || 3000

app.use(pinoHttp({ logger }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("/health", (req, res) => {
  res.json({ message: "OK" });
});

app.use("/verses", versesRouter);

app.listen(port, () => {
  logger.info(`server running at http://localhost:${port}`);
});
