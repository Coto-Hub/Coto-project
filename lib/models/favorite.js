'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Favorite extends Model {

    static get tableName() {
        return 'favorite';
    }

    static get joiSchema() {

        return Joi.object({
            id_user: Joi.number().integer().example(1).description('Id de l\'utilisateur'),
            id_movie: Joi.number().integer().example(1).description('Id du film')
        });
    }
};
