import bcrypt from 'bcryptjs'

// import passport from 'passport'
// import LocalStrategy from 'passport-local'

import { createUser, getUserByEmail, userToUIObj } from './user.service.js'

export const loginUser = async (email, password) => {
  let isMatch = false
  const user = await getUserByEmail(email)
  if (user) {
    isMatch = bcrypt.compare(password, user.password)
    if (isMatch) {
      return userToUIObj(user)
    }
  }
  return null
}

export const registerUser = async (userData) => {
  const user = await createUser(userData)
  return user
}

// Configure local strategy
// const strategy = new LocalStrategy(async function (email, password, done) {
//   let user
//   try {
//     user = await findOne(table, { email })
//     if (!user) return done(null, false, { message: 'No user with that email' })
//   } catch (err) {
//     return done(err)
//   }
//   const isMatch = bcrypt.compare(password, user.password)
//   if (!isMatch) return done(null, false, { message: 'Faulty password' })

//   delete user['password']
//   return done(null, user)
// })

// Setup local passport strategy
// passport.use(strategy)
