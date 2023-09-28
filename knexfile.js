import dotenv from 'dotenv'

dotenv.config()

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev_db.sqlite',
    },
    useNullAsDefault: true,
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './test_db.sqlite',
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: process.env.DB_CONNECTION,
    pool: {
      min: 2,
      max: 10,
    },
  },
}
