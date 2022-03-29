'use strict';

const Joi = require('joi');
const user = require('../../payload/user');

module.exports = {
    method: 'post',
    path: '/user',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: user.allObject()
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        const { mailService } = request.services();

        try {
            await mailService.sendMail([request.payload.mail], 'Bienvenue', 'Bienvenue ' + request.payload.firstName + ' ' + request.payload.lastName + ' sur notre magnifique site web');
            return await userService.create(request.payload);
        } catch (err) {
            return 'Une erreur est survenue';
        }
    }
};
