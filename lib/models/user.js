'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {
        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('Thomas').description('Prénom'),
            lastName: Joi.string().min(3).example('Marty').description('Nom'),
            password: Joi.string().min(8).description('Mot de passe'),
            mail: Joi.string().min(3).example('thomas.marty@etu.unilim.fr').regex(/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/).description('Adresse mail'),
            username: Joi.string().min(3).example('Coto').description('Username'),
            scope: Joi.array().items(Joi.string()).example(['user']).description('role'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }
    $beforeInsert(queryContext) {
        this.scope = ['user'];
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }
    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }

    static get JsonAttributes() {
        return ['scope', 'admin'];
    }
};
