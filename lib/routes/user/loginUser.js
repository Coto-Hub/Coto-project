'use strict';

const Joi = require('joi');

module.exports = {
    method: 'POST',
    path: '/user/login',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                username: Joi.string().example('Coto').description('Username'),
                password: Joi.string().required().min(8).description('Mot de passe').example('&-#Coto#-&')
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        return await userService.login(request.payload);
    }
};
