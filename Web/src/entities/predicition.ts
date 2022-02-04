import { Entity, Column } from 'typeorm'
import { BaseEntity } from './baseEntity'
import { MatchResultTypes, MatchTotalTypes, MatchTotalValueTypes } from '../utils/enums'

@Entity()
export class Prediction extends BaseEntity {
  @Column()
    result: MatchResultTypes

  @Column()
    total: MatchTotalValueTypes

  @Column()
    totalType: MatchTotalTypes

  @Column({ nullable: false })
    postId: string
}
