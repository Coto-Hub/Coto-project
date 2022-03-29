'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('favorite', (table) => {
            table.integer('id_user').unsigned().index().references('id').inTable('user');
            table.integer('id_movie').unsigned().index().references('id').inTable('movie');
            table.primary(['id_user', 'id_movie']);
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('favorite');
    }
};
