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
        const { userService } = request.services();
        const { movieService } = request.services();
        const { mailService } = request.services();

        try {
            const usersEmail = await userService.getAllMail();
            const msg = 'Bonjour, un nouveau film viens de sortir : "' + request.payload.title + '" venez le voirs trés vite.';
            await mailService.sendMail(usersEmail, request.payload.title, msg);
            return await movieService.create(request.payload);
        } catch (err) {
            return 'Une erreur est survenue';
        }
    }
};
