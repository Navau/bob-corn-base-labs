import { ICornEntity } from "@/interfaces";

export interface IFormCornProps {
  corns: ICornEntity[];
  handleBuyCorn: (clientId: string) => Promise<void>;
}
