import request from "supertest";
import app from "../../../app";
import { AppDataSource } from "../../../config/database.config";

//? Mock de la base de datos
beforeAll(async () => {
  await AppDataSource.initialize();

  //? Inserta datos de prueba
  const repository = AppDataSource.getRepository("Corn");
  await repository.insert([
    { clientId: "12345", timestamp: new Date() },
    { clientId: "12346", timestamp: new Date() },
  ]);
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("GET /corn/paginated", () => {
  it("Debería retornar una lista paginada de compras", async () => {
    const response = await request(app)
      .get("/api/corn/paginated")
      .query({ page: 1, limit: 10 });

    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it("Debería retornar un error 400 si faltan parámetros de consulta", async () => {
    try {
      await request(app).get("/api/corn/paginated").query({});
    } catch (error: any) {
      console.log(error);

      expect(error.status).toBe(400);
      expect(error.body).toEqual({ error: "Invalid query parameters" });
    }
  });
});
