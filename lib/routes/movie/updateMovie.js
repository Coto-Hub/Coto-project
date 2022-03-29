'use strict';

const Joi = require('joi');
const movie = require('../../payload/movie');

module.exports = {
    method: 'PATCH',
    path: '/movie/{id}',
    options: {
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required()
            }),
            payload: movie.allObject()
        },
        auth: {
            scope: ['admin']
        }
    },
    handler: async (request, h) => {
        const { movieService } = request.services();

        return await movieService.update(request.params.id, request.payload);
    }
};
