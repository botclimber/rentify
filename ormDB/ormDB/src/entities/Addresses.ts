import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { ResidenceAddresses } from "./ResidenceAddresses"

@Entity()
export class Addresses {

    @PrimaryGeneratedColumn()
    id: number

    @Column("double")
    lat: number

    @Column("double")
    lng: number

    @Column()
    city: string

    @Column()
    street: string

    @Column()
    nr: number

    @Column()
    postalCode: string

    @Column()
    country: string

    @OneToMany(() => ResidenceAddresses, (rs) => rs.addresses)
    rs: ResidenceAddresses[]

}
