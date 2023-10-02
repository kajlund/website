import crypto from 'node:crypto'

import bcrypt from 'bcryptjs'

import { createOne, findOne } from '../utils/dao.js'

const table = 'Users'
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10)

export const userToUIObj = (user) => {
  const hash = crypto.createHash('md5').update(user.email).digest('hex')
  const avatar = `https://www.gravatar.com/avatar/${hash}?s=36`
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    avatar,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

export const createUser = async (userData) => {
  userData.password = await bcrypt.hash(userData.password, SALT_ROUNDS)
  const user = await createOne(table, userData)
  return userToUIObj(user)
}

export const getUserById = async (id) => {
  const user = await findOne(table, { id })
  return userToUIObj(user)
}

export const getUserByEmail = async (email) => {
  const user = await findOne(table, { email })
  return user // return with pwd for comparison
}
