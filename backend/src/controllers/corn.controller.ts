import { Request, Response } from "express";
import { CornService } from "../services/corn.service";
import { RATE_LIMIT_PER_MINUTE } from "../constants/corn.constants";

export class CornController {
  private service: CornService;

  constructor() {
    this.service = new CornService();
  }

  async buyCorn(req: Request, res: Response): Promise<void> {
    const { clientId } = req.body;

    if (!clientId) {
      res.status(400).json({ message: "Id de cliente es requerido" });
      return;
    }

    try {
      await this.service.buyCorn(clientId);
      res.status(200).json({ message: "Maiz comprado con exito" });
    } catch (error: any) {
      res.status(429).json({
        message: `Limite de compras excedido, porfavor espere ${RATE_LIMIT_PER_MINUTE} segundo(s)`,
      });
    }
  }

  async getCornsPaginated(req: Request, res: Response): Promise<void> {
    const { page = 1, limit = 10 } = req.query;

    try {
      const result = await this.service.getCornsPaginated(
        Number(page),
        Number(limit)
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Falló al obtener los registros" });
    }
  }

  async getAllCorns(req: Request, res: Response): Promise<void> {
    const { clientId } = req.query;

    try {
      const result = await this.service.getAllCorns(clientId?.toString() ?? "");
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Falló al obtener los registros" });
    }
  }
}
