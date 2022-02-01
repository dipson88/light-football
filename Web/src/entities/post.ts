import { Entity, Column, ObjectIdColumn, ObjectID, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Post implements IPost {
  @ObjectIdColumn({ unique: true })
    _id: ObjectID

  @Column()
    title: string

  @Column()
    content: string

  @ObjectIdColumn({ nullable: false })
    userId: ObjectID

  @Column({ nullable: false })
    matchId: string

  @CreateDateColumn({ type: 'timestamp' })
    cratedAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date
}

export interface IPost {
  _id: ObjectID,
  title: string
  content: string
  userId: ObjectID
  matchId: string // TODO: add ref to match
}
