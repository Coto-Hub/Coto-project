'use strict';

const Joi = require('joi');

module.exports = {
    method: 'delete',
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

        try {
            return await favoriteService.delete(request.params.id, request.headers.authorization.split(' ')[1]);
        } catch (err) {
            return 'Une erreur est survenue';
        }
    }
};
