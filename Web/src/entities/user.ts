import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm'
import { BaseEntity } from './baseEntity'
import { IsEmail, Length } from 'class-validator'
import bcrypt from 'bcryptjs'

interface IUserInput {
  email: string
  password: string
  name: string
}

@Entity()
export class User extends BaseEntity {
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

  @BeforeInsert()
  @BeforeUpdate()
  private async getHashedPassword () {
    this.password = await bcrypt.hash(this.password, 8)
  }

  constructor (user?: IUserInput) {
    super()

    if (user) {
      this.email = user.email
      this.password = user.password
      this.name = user.name
    }
  }
}
