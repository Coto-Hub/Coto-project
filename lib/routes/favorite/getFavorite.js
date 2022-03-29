'use strict';

const Joi = require('joi');

module.exports = {
    method: 'get',
    path: '/favorite',
    options: {
        tags: ['api'],
        auth: {
            scope: ['user', 'admin']
        }
    },
    handler: async (request, h) => {
        const { favoriteService } = request.services();

        try {
            return await favoriteService.list(request.headers.authorization.split(' ')[1]);
        } catch (err) {
            return 'Une erreur est survenue';
        }
    }
};
