import { IsNotEmpty } from 'class-validator'
import { Entity, Column } from 'typeorm'
import { BaseEntity } from './baseEntity'
import { MatchResultTypes, MatchTotalTypes, MatchTotalValueTypes } from '../utils/enums'

interface IPostInput {
  content: string
  userId: string
  matchId: number
  result: MatchResultTypes
  total: MatchTotalValueTypes
  totalType: MatchTotalTypes
}

@Entity()
export class Post extends BaseEntity {
  @Column()
    content: string

  @IsNotEmpty()
  @Column({ nullable: false })
    userId: string

  @IsNotEmpty()
  @Column({ nullable: false })
    matchId: number

  @IsNotEmpty()
  @Column()
    result: MatchResultTypes

  @IsNotEmpty()
  @Column()
    total: MatchTotalValueTypes

  @IsNotEmpty()
  @Column()
    totalType: MatchTotalTypes

  constructor (post?: IPostInput) {
    super()

    if (post) {
      this.content = post.content
      this.userId = post.userId
      this.matchId = post.matchId
      this.result = post.result
      this.total = post.total
      this.totalType = post.totalType
    }
  }
}
