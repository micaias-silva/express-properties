import "reflect-metadata";
import "express-async-errors";
import express from "express";
import errorHandlingMiddleware from "./middlewares/errorHandling.middleware";
import routes from "./routes";

const app = express();
app.use(express.json());

routes(app);
app.use(errorHandlingMiddleware);

export default app;
