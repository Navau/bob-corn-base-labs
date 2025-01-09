import { BASE_SOCKET } from "@/constants";
import { uniqueId } from "lodash";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

//? Función para inicializar el socket y guardar el `socketId` en cookies
export const initializeSocket = (): Promise<Socket> => {
  return new Promise((resolve) => {
    const socket = io(BASE_SOCKET);

    socket.on("connect", () => {
      const socketId = socket.id || uniqueId();

      if (!Cookies.get("clientId")) {
        Cookies.set("clientId", socketId, { sameSite: "Strict", path: "/" });
      }

      console.log("Socket conectado con ID:", socketId);
      resolve(socket);
    });
  });
};

//? Función para enviar el evento `buyCorn`
export const sendBuyCorn = (socketIo: Socket) => {
  //? Obtén el `clientId` desde las cookies
  const clientId = Cookies.get("clientId");

  //? Verifica que el `clientId` esté disponible
  if (!clientId) {
    console.error("Error: clientId no encontrado en cookies.");
    return;
  }

  //? Emitir el evento `buyCorn` al servidor
  socketIo.emit("buyCorn", { clientId }, (response: any) => {
    if (response.success) {
      console.log("Compra realizada:", response.result);
    } else {
      console.error("Error al comprar maíz:", response.message);
    }
  });
};
