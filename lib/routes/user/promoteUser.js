'use strict';

const Joi = require('joi');

module.exports = {
    method: 'POST',
    path: '/user/promote/{id}',
    options: {
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required()
            })
        },
        auth: {
            scope: ['admin']
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        try {
            return await userService.promote(request.params.id);
        } catch (err) {
            return 'L\'utilisateur n\'existe pas';
        }
    }
};
