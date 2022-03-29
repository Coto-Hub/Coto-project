'use strict';

const { Service } = require('@hapipal/schmervice');
const Jwt = require('@hapi/jwt');

module.exports = class FavoriteService extends Service {
    list(userToken) {
        const { Favorite } = this.server.models();

        const id_user = Jwt.token.decode(userToken).decoded.payload.id;

        return Favorite.query().select().where('id_user', id_user);
    }
    create(id_movie, userToken) {
        const { Favorite } = this.server.models();
        let favorite = new Favorite();
        favorite.id_movie = id_movie;
        favorite.id_user = Jwt.token.decode(userToken).decoded.payload.id;

        return Favorite.query().insertAndFetch(favorite);
    }
    delete(id_movie, userToken) {
        const { Favorite } = this.server.models();

        const id_user = Jwt.token.decode(userToken).decoded.payload.id;

        return Favorite.query().delete().where('id_movie', id_movie).where('id_user', id_user);
    }
};
