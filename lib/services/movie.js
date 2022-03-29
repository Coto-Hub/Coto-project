'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {
    list() {
        const { Movie } = this.server.models();

        return Movie.query().execute();
    }
    create(movie) {

        const { Movie } = this.server.models();

        return Movie.query().insertAndFetch(movie);
    }
    async read(id) {
        const { Movie } = this.server.models();

        return await Movie.query().findById(id);
    }
    update(id, movie) {
        const { Movie } = this.server.models();
        return Movie.query().updateAndFetchById(id, movie).throwIfNotFound();
    }
    delete(id) {
        const { Movie } = this.server.models();

        return Movie.query().delete().where('id', id);
    }
};
