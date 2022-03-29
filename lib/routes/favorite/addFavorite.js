'use strict';

const Joi = require('joi');

module.exports = {
    method: 'POST',
    path: '/favorite/{id}',
    options: {
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required()
            })
        },
        auth: {
            scope: ['user', 'admin']
        }
    },
    handler: async (request, h) => {
        const { favoriteService } = request.services();

        const token = request.headers.authorization.split(' ')[1];

        try {
            return await favoriteService.create(request.params.id, request.headers.authorization.split(' ')[1]);
        } catch (err) {
            if (err.message.includes('ER_DUP_ENTRY')) {
                return 'Le film est déjà dans les favory';
            }

            return 'Le film n\'existe pas';

        }
    }
};
