'use strict';

const { Service } = require('@hapipal/schmervice');
const Jwt = require('@hapi/jwt');
const Encrypt = require('@coto-hub-/iut-encrypt');

module.exports = class UserService extends Service {
    async login(userData) {
        const { User } = this.server.models();
        const user = await User.query()
            .select('id', 'password', 'firstName', 'lastName', 'mail', 'scope')
            .where('username', userData.username).first();
        if (Encrypt.compareSha1(userData.password, user.password)) {
            return Jwt.token.generate(
                {
                    aud: 'urn:audience:iut',
                    iss: 'urn:issuer:iut',
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.mail,
                    scope: user.scope,
                    id: user.id
                },
                {
                    key: '&-#Coto#-&',
                    algorithm: 'HS512'
                },
                {
                    ttlSec: 14400
                }
            );
        }

        return 'La correspondence login, mot de passe n\'existe pas';
    }
    async promote(id) {
        const user = await this.read(id);
        user.scope = ['admin'];
        return await this.update(id, user);
    }
    async list() {
        const { User } = this.server.models();

        return await User.query().execute();
    }
    async create(user) {

        const { User } = this.server.models();

        user.password = Encrypt.sha1(user.password);

        return await User.query().insertAndFetch(user);
    }
    async read(id) {
        const { User } = this.server.models();

        return await User.query().findById(id);
    }
    async update(id, user) {
        const { User } = this.server.models();
        return await User.query().updateAndFetchById(id, user).throwIfNotFound();
    }
    async delete(id) {
        const { User } = this.server.models();

        return await User.query().delete().where('id', id);
    }
    async getAllMail() {
        const { User } = this.server.models();

        return await User.query().pluck('mail').execute();
    }
    async getAllMailFromMovie(id_movie) {
        const { User } = this.server.models();
        const { Favorite } = this.server.models();

        const users = await Favorite.query().where({ id_movie }).pluck('id_user').execute();
        return await User.query().pluck('mail').whereIn( 'id', users).execute();
    }
};
