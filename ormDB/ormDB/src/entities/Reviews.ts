import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { ResidenceAddresses } from "./ResidenceAddresses"

@Entity()
export class Reviews {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    adminId: number

    @OneToOne(() => ResidenceAddresses, (resAddresses) => resAddresses.reviews)
    @JoinColumn()
    residenceAddresses: ResidenceAddresses

    @Column("text")
    review: string

    @Column()
    rating: number

    @CreateDateColumn({ name: 'createdOn'})
    createdOn: Date;

    @UpdateDateColumn({ name: 'approvedOn' })
    approvedOn: Date;

    @Column("tinyint")
    anonymous: number

    @Column()
    approved: number

}
