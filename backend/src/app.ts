import express from "express";
import cors from "cors";
import morgan from "morgan";
import cornRoutes from "./routes/corn.routes";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.swagger();
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());
  }

  private routes(): void {
    this.app.use("/api/corn", cornRoutes);
  }

  private swagger(): void {
    this.app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

export default new App().app;
