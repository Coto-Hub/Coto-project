'use strict';

const { Service } = require('@hapipal/schmervice');
const Jwt = require('@hapi/jwt');

module.exports = class FavoriteService extends Service {
    async list(userToken) {
        const { Favorite } = this.server.models();

        const id_user = Jwt.token.decode(userToken).decoded.payload.id;

        return await Favorite.query().select().where('id_user', id_user);
    }
    async create(id_movie, userToken) {
        const { Favorite } = this.server.models();
        const favorite = new Favorite();
        favorite.id_movie = id_movie;
        favorite.id_user = Jwt.token.decode(userToken).decoded.payload.id;

        return await Favorite.query().insertAndFetch(favorite);
    }
    async delete(id_movie, userToken) {
        const { Favorite } = this.server.models();

        const id_user = Jwt.token.decode(userToken).decoded.payload.id;

        return await Favorite.query().delete().where('id_movie', id_movie).where('id_user', id_user);
    }
    async deleteAll(id_movie) {
        const { Favorite } = this.server.models();

        return await Favorite.query().delete().where('id_movie', id_movie);
    }
};
