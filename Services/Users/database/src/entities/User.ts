import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("User")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { unique: true, length: 60 })
  email: string;

  @Column("varchar", { unique: true, length: 30 })
  username: string;

  @Column("varchar", { length: 30 })
  firstName: string;

  @Column("varchar", { length: 30 })
  lastName: string;

  @Column("varchar", { length: 128 })
  password: string;

  @Column("boolean", { default: false })
  verified: boolean = false;
}
