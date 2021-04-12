'use strict';

const { Service } = require('@hapipal/schmervice');
const Jwt = require('@hapi/jwt');

module.exports = class UserService extends Service {
    async login(userData) {
        const { User } = this.server.models();
        const user = await User.query()
            .select('id', 'password', 'firstName', 'lastName', 'mail', 'scope')
            .where('username', userData.username).first();
        const password = user.password;
        if (userData.password === password) {
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
        return this.update(id, user);
    }
    list() {
        const { User } = this.server.models();

        return User.query().execute();
    }
    create(user) {

        const { User } = this.server.models();

        return User.query().insertAndFetch(user);
    }
    async read(id) {
        const { User } = this.server.models();

        return await User.query().findById(id);
    }
    update(id, user) {
        const { User } = this.server.models();
        return User.query().updateAndFetchById(id, user).throwIfNotFound();
    }
    delete(id) {
        const { User } = this.server.models();

        return User.query().delete().where('id', id);
    }
};
