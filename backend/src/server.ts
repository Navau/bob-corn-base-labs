import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { AppDataSource } from "./config/database.config";
import { cornSocketHandler } from "./sockets/corn.socket";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

class ServerBootstrap {
  private apiPort: number;
  private apiServer: string;

  constructor() {
    this.apiPort = process.env.API_PORT ? Number(process.env.API_PORT) : 3000;
    this.apiServer = process.env.API_SERVER
      ? process.env.API_SERVER
      : "localhost";

    this.initializeDatabase();
    this.configureSocketIO();
  }

  private async initializeDatabase(): Promise<void> {
    try {
      await AppDataSource.initialize();
      console.log("Database connected successfully");
      this.listen();
    } catch (error) {
      console.error("Error connecting to the database:", error);
      process.exit(1);
    }
  }

  private listen(): void {
    server.listen(this.apiPort, () => {
      console.log("#####################");
      console.log("###### API_REST #####");
      console.log("#####################");
      console.log(`http://${this.apiServer}:${this.apiPort}/api`);
    });
  }

  private configureSocketIO(): void {
    io.on("connection", (socket) => {
      console.log("Cliente conectado:", socket.id);

      cornSocketHandler(io, socket);

      socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
      });
    });
  }
}

new ServerBootstrap();
