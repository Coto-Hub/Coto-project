'use strict';

const Joi = require('joi');
module.exports = {
    method: 'get',
    path: '/movie/{id}',
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
        const { movieService } = request.services();

        try {
            return await movieService.read(request.params.id);
        } catch (err) {
            return 'Le film n\'existe pas';
        }
    }
};
