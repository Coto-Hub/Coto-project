'use strict';

const Joi = require('joi');
const movie = require('../../payload/movie');

module.exports = {
    method: 'POST',
    path: '/movie',
    options: {
        tags: ['api'],
        validate: {
            payload: movie.allObject()
        },
        auth: {
            scope: ['admin']
        }
    },
    handler: async (request, h) => {
        const { movieService } = request.services();

        return await movieService.create(request.payload);
    }
};
