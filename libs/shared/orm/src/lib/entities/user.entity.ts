import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from "typeorm";
import {Exclude} from "class-transformer";

@Entity('users')
@Unique('unique_constraint', ['email', 'verificationCode'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  emailVerifiedAt: Date;

  @Column({ type: 'bigint' })
  verificationCode: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
