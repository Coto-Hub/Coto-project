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

        return await movieService.read(request.params.id);
    }
};
