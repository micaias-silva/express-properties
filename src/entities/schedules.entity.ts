import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";

import { Properties } from "./properties.entity";
import { Users } from "./users.entity";

@Entity("schedules_users_properties")
export class Schedules {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "date", nullable: false })
  date: string;

  @Column({ type: "time", nullable: false })
  hour: string;

  @ManyToOne((type) => Users, (user) => user.id, { eager: true })
  user: Users;

  @ManyToOne((type) => Properties, (properties) => properties.id, {
    eager: true,
  })
  property: Properties;
}
