import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import mongoose from 'mongoose'

class User {
  @prop()
    email: string

  @prop()
    password: string

  @prop()
    name: string

  @prop()
    createdAt: Date

  @prop()
    updatedAt: Date

  @prop({
    ref: () => 'Post',
    foreignField: 'user',
    localField: '_id'
  })
    posts: Ref<Post>[]
  // @prop({
  //   ref: () => (doc: DocumentType<User>) => doc._id,
  //   foreignField: () => 'userId',
  //   localField: (doc: DocumentType<User>) => doc._id,
  //   justOne: false
  // })
  //   posts: Ref<Post>[]
}

class Post {
  @prop()
    title: string

  @prop()
    content: string

  @prop({ ref: () => User })
    user: Ref<User>

  @prop()
    matchId: string

  @prop()
    cratedAt: Date

  @prop()
    updatedAt: Date
}

// const UserModel = getModelForClass(User)
const PostModel = getModelForClass(Post)

const testCreate = async () => {
  // const user = await UserModel.create({ password: 123123123 })
  // const allahUser = await UserModel.findById('61fbf1a1a28d40ac61289bbd')
  // const p = await PostModel.create({ content: '123123', user: '61fbf1a1a28d40ac61289bbd' })
  const allahPosts = await PostModel.findById('61fbf1d90732316a4b58e020')

  // console.log(await allahPosts?.populate({ path: 'user', model: UserModel }))
  console.log(allahPosts)
  // const allahUser = await UserModel.findById('61fbec2bb1e0757a3dcedb71')
  // user.populate('Posts')
  // console.log(allahUser)

  // const a = await allahUser?.populate({ path: 'posts', model: UserModel }) ?? null

  // if (a) {
  //   a.posts = [p]
  // }

  // await a?.save()
  // const b = await p.populate('user')
  // console.log(a?.posts, 'DATA')
  // console.log(b, 'DATA USER')

  // console.log(user)
  // console.log(post)
}

const testDb = async () => {
  await mongoose.connect(process.env.MONGODB_URL ?? '')
}

export {
  testCreate,
  testDb
}
