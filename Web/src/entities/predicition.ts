import { Entity, Column, ObjectIdColumn, ObjectID, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { MatchResultTypes, MatchTotalTypes, MatchTotalValueTypes } from '../utils/enums'

@Entity()
export class Prediction implements IPrediction {
  @ObjectIdColumn({ unique: true })
    _id: ObjectID

  @Column()
    result: MatchResultTypes

  @Column()
    total: MatchTotalValueTypes

  @Column()
    totalType: MatchTotalTypes

  @ObjectIdColumn({ nullable: false })
    postId: ObjectID

  @CreateDateColumn({ type: 'timestamp' })
    cratedAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date
}

export interface IPrediction {
  _id: ObjectID,
  result: MatchResultTypes
  total: MatchTotalValueTypes
  totalType: MatchTotalTypes
  postId: ObjectID
}
