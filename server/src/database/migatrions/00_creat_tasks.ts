import Knex from 'knex';

//commit
export async function up(knex: Knex) {
    return knex.schema.createTable('tasks',
        table => {
            table.increments('id').primary();
            table.string('description').notNullable();
            table.boolean('isActive').defaultTo(0);
        })
}

//rollback
export async function down(knex: Knex) {
    return knex.schema.dropTable('tasks');
}