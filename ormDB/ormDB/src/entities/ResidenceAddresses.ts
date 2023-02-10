import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm"
import { Addresses } from "./Addresses"
import { Reviews } from "./Reviews"

@Entity()
export class ResidenceAddresses {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Addresses, (addr) => addr.rs)
    @JoinColumn()
    addresses: Addresses

    @Column()
    floor: string

    @Column()
    direction: string

    @OneToMany(() => Reviews, (reviews) => reviews.residenceAddresses)
    reviews: Reviews[]

}
