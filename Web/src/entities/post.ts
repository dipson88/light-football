import { Entity, Column } from 'typeorm'
import { BaseEntity } from './baseEntity'

@Entity()
export class Post extends BaseEntity {
  @Column()
    title: string

  @Column()
    content: string

  @Column({ nullable: false })
    userId: string

  @Column({ nullable: false })
    matchId: string
}
