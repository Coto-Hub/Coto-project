'use strict';

const Joi = require('joi');
module.exports = {
    method: 'get',
    path: '/users',
    options: {
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required()
            })
        },
        auth: {
            scope: ['user']
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        return await userService.read(request.params.id);
    }
};
