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
        const { userService } = request.services();
        const { mailService } = request.services();

        try {
            const usersEmail = await userService.getAllMailFromMovie(request.params.id);
            const msg = 'Bonjour, un film viens d\'étre modifier : "' + request.payload.title + '" venez le consulter trés vite.';
            await mailService.sendMail(usersEmail, request.payload.title, msg);
            return await movieService.update(request.params.id, request.payload);
        } catch (err) {
            return 'Une erreur est survenue';
        }
    }
};
