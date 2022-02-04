import { User } from '../../src/entities/user'
// import userService from '../../src/services/userService'
import request from 'supertest'
import app from '../../src/app'
import { getRepository } from 'typeorm'
import db from '../../src/db'

import * as path from 'path'

import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '../../.env.test') })

test('Create a new user', async () => {
  const user = new User({
    email: 'email@email.com',
    password: 'emailTest123',
    name: 'Dima'
  })

  await db.setDbConnection(process.env.MONGODB_URL)

  await request(app).post('/users/create').send({
    ...user
  })

  const res = await request(app).post('/users/login').send({
    email: 'email@email.com', password: 'emailTest123'
  })

  const rep = getRepository(User)
  const users = await rep.find({ email: 'email@email.com' })

  console.log(users)
  console.log(res.status)
})

// describe('UserService', () => {
//   it('create user', async () => {
//     const user = new User({
//       email: 'email@email.com',
//       password: 'emailTest123',
//       name: 'Dima'
//     })

//     const createdUser = await userService.createUser(user)

//     console.log(createdUser)

//     expect(createdUser.data).toContainEqual(user)
//   })
// })
