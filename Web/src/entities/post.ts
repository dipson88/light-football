import { IsNotEmpty } from 'class-validator'
import { Entity, Column } from 'typeorm'
import { BaseEntity } from './baseEntity'

@Entity()
export class Post extends BaseEntity {
  @Column()
    title: string

  @Column()
    content: string

  @IsNotEmpty()
  @Column({ nullable: false })
    userId: string

  @IsNotEmpty()
  @Column({ nullable: false })
    matchId: string

  constructor (post?: IPostInput) {
    super()

    if (post) {
      this.title = post.title
      this.content = post.content
      this.userId = post.userId
      this.matchId = post.matchId
    }
  }
}

interface IPostInput {
  title: string,
  content: string
  userId: string
  matchId: string
}
