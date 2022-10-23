import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categories {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false, unique: true })
  name: string;
}
