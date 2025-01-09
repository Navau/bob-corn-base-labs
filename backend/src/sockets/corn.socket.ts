import { Server, Socket } from "socket.io";
import { CornService } from "../services/corn.service";

export const cornSocketHandler = (io: Server, socket: Socket) => {
  const service = new CornService();

  //? Manejo del evento `buyCorn`
  socket.on("buyCorn", async (data, callback) => {
    try {
      const { clientId } = data;

      const result = await service.buyCorn(clientId);

      callback({ success: true, message: "Compra realizada", result });

      io.emit("updateCorns", {
        message: "Nueva compra realizada",
        data: result,
      });
    } catch (error) {
      console.error("Error al comprar maíz:", error);
      callback({ success: false, message: "Error al comprar maíz" });
    }
  });
};
