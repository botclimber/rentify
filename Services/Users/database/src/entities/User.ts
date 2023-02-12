import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column("boolean", { default: false })
  confirmed: boolean = false;
}
