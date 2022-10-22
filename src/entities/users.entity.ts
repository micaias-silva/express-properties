import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 256, nullable: false })
  name: string;

  @Column({ length: 128, unique: true, nullable: false })
  email: string;

  @Column({ length: 64, nullable: false })
  password: string;

  @Column({ default: false })
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
