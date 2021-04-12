'use strict';

const Joi = require('joi');
const user = require('../../payload/user');

module.exports = {
    method: 'PATCH',
    path: '/user/{id}',
    options: {
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required()
            }),
            payload: user.allObject()
        },
        auth: {
            scope: ['admin']
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        return await userService.update(request.params.id, request.payload);
    }
};
