import request from "supertest";
import app from "../../../app";
import { AppDataSource } from "../../../config/database.config";

//? Mock de la base de datos
beforeAll(async () => {
  await AppDataSource.initialize();

  //? Inserta datos de prueba
  const repository = AppDataSource.getRepository("Corn");
  await repository.insert([
    { clientId: "12345", timestamp: new Date("2025-01-01T10:00:00Z") },
    { clientId: "12345", timestamp: new Date("2025-01-02T12:00:00Z") },
    { clientId: "67890", timestamp: new Date("2025-01-03T14:00:00Z") },
  ]);
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("GET /corn", () => {
  it("Debería retornar una lista de compras para un clientId específico", async () => {
    const clientId = "12345";
    const response = await request(app).get("/api/corn").query({ clientId });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
