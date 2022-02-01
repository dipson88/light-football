import { Entity, Column, ObjectIdColumn, ObjectID, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { IsEmail, Length } from 'class-validator'

@Entity()
export class User implements IUser {
  @ObjectIdColumn({ unique: true })
    _id: ObjectID

  @Column({ unique: true })
  @IsEmail()
  @Length(0, 40)
    email: string

  @Column()
  @Length(8, 40)
    password: string

  @Column()
  @Length(0, 40)
    name: string

  @CreateDateColumn({ type: 'timestamp' })
    cratedAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date
}

export interface IUser {
  _id: ObjectID
  email: string
  password: string
  name: string
}
