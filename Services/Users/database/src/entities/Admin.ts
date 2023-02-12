import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Admin")
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 60, unique: true })
  email: string;

  @Column("varchar", { length: 30, unique: true })
  username: string;

  @Column("varchar", { length: 128 })
  password: string;
}
