import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Addresses {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  district: string;

  @Column({ nullable: false, length: 8 })
  zipCode: string;

  @Column({ nullable: true })
  number?: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false, length: 2 })
  state: string;
}
