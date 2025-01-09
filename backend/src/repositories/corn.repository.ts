import { MoreThan } from "typeorm";
import { AppDataSource } from "../config/database.config";
import { Corn } from "../entities/corn.entity";

export class CornRepository {
  private repository = AppDataSource.getRepository(Corn);

  async saveCorn(clientId: string): Promise<Corn> {
    const corn = this.repository.create({ clientId });
    return await this.repository.save(corn);
  }

  async canBuyCorn(
    clientId: string,
    limitPerMinute: number,
    past: Date
  ): Promise<boolean> {
    const recentPurchases = await this.repository.count({
      where: { clientId, timestamp: MoreThan(past) },
    });

    return recentPurchases < limitPerMinute / 60;
  }

  async getCornsPaginated(page: number, limit: number) {
    const [data, total] = await this.repository.findAndCount({
      take: limit,
      skip: page,
      order: { timestamp: "DESC" },
    });

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async getAllCorns(clientId?: string): Promise<Corn[]> {
    const whereCondition = clientId ? { clientId } : {};
    return await this.repository.find({ where: whereCondition });
  }
}
