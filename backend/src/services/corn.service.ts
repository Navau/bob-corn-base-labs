import { RATE_LIMIT_PER_MINUTE } from "../constants/corn.constants";
import { CornRepository } from "../repositories/corn.repository";

export class CornService {
  private repository: CornRepository;

  constructor() {
    this.repository = new CornRepository();
  }

  async buyCorn(clientId: string): Promise<void> {
    const now = new Date();
    const past = new Date(now.getTime() - RATE_LIMIT_PER_MINUTE * 1000); //? Convierte minutos a milisegundos
    const canBuy = await this.repository.canBuyCorn(
      clientId,
      RATE_LIMIT_PER_MINUTE,
      past
    );

    if (!canBuy) {
      throw new Error(
        `Limite de compras excedido, porfavor espere ${RATE_LIMIT_PER_MINUTE} segundo(s)`
      );
    }

    await this.repository.saveCorn(clientId);
  }

  async getCornsPaginated(page: number, limit: number) {
    return await this.repository.getCornsPaginated(page, limit);
  }

  async getAllCorns(clientId: string) {
    return await this.repository.getAllCorns(clientId);
  }
}
