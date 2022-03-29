'use strict';

const Joi = require('joi');
module.exports = {
    method: 'get',
    path: '/user/{id}',
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
        const { userService } = request.services();

        try {
            return await userService.read(request.params.id);
        } catch (err) {
            return 'L\'utilisateur n\'existe pas';
        }
    }
};
