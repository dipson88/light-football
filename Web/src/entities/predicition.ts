import { Entity, Column } from 'typeorm'
import { BaseEntity } from './baseEntity'
import { MatchResultTypes, MatchTotalTypes, MatchTotalValueTypes } from '../utils/enums'
import { IsNotEmpty } from 'class-validator'

@Entity()
export class Prediction extends BaseEntity {
  @IsNotEmpty()
  @Column()
    result: MatchResultTypes

  @IsNotEmpty()
  @Column()
    total: MatchTotalValueTypes

  @IsNotEmpty()
  @Column()
    totalType: MatchTotalTypes

  @IsNotEmpty()
  @Column({ nullable: false })
    postId: string

  constructor (prediction?: IPredictionInput) {
    super()

    if (prediction) {
      this.result = prediction.result
      this.total = prediction.total
      this.totalType = prediction.totalType
      this.postId = prediction.postId
    }
  }
}

interface IPredictionInput {
  result: MatchResultTypes,
  total: MatchTotalValueTypes
  totalType: MatchTotalTypes
  postId: string
}
