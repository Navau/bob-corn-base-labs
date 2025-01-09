import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Corn {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  clientId!: string;

  @CreateDateColumn()
  timestamp!: Date;
}
