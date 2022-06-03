import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../../../users/infra/typeorm/entities/User";

@Entity("todos")
class Todo {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  description: string;

  @Column()
  deadline: Date;

  @Column({ default: "Pending" })
  status: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "owner_id" })
  user: User;

  @Column()
  owner_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Todo };
