/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  // await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

  await knex.schema.createTable('Users', (table) => {
    // table.increments('id')
    table.uuid('id', { useBinaryUuid: false, primaryKey: true })
    table.string('username').notNullable().defaultTo('')
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.string('role').notNullable().defaultTo('PROSPECT')
    table.timestamps(true, true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('Users')
}
