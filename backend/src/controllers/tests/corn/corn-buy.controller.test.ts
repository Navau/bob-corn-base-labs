import request from "supertest";
import app from "../../../app";
import { AppDataSource } from "../../../config/database.config";

//? Mock de la base de datos
beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("POST /corn/buy", () => {
  it("Debería registrar una compra exitosa", async () => {
    try {
      const response = await request(app)
        .post("/api/corn/buy")
        .send({ clientId: "12345" });

      expect(response.status).toBe(200);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it("Debería retornar un error 429 si se excede el límite", async () => {
    try {
      //? Realiza dos compras seguidas para probar el límite
      await request(app).post("/api/corn/buy").send({ clientId: "123456" });

      const response = await request(app)
        .post("/api/corn/buy")
        .send({ clientId: "123456" });
    } catch (error: any) {
      expect(error.status).toBe(429);
      expect(error.body).toEqual({ error: "Rate limit exceeded" });
    }
  });

  it("Debería retornar un error 400 si no se envía clientId", async () => {
    try {
      const response = await request(app).post("/api/corn/buy").send({});
    } catch (error: any) {
      expect(error.status).toBe(400);
      expect(error.body).toEqual({ error: "Client ID is required" });
    }
  });
});
