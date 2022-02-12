import { ObjectIdColumn, ObjectID, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export class BaseEntity {
  @ObjectIdColumn({ unique: true })
  private _id: ObjectID

  get id () {
    return this._id.toString()
  }

  @CreateDateColumn({ type: 'timestamp' })
    cratedAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date
}
