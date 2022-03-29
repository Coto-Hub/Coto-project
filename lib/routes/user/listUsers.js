'use strict';

module.exports = {
    method: 'get',
    path: '/users',
    options: {
        tags: ['api'],
        auth: {
            scope: ['user', 'admin']
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        try {
            return await userService.list();
        } catch (err) {
            return 'Une erreur est survenue';
        }
    }
};
