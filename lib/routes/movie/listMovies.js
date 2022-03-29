'use strict';

module.exports = {
    method: 'get',
    path: '/movies',
    options: {
        tags: ['api'],
        auth: {
            scope: ['user', 'admin']
        }
    },
    handler: async (request, h) => {
        const { movieService } = request.services();

        try {
            return await movieService.list();
        } catch (err) {
            return 'Une erreur est survenue';
        }
    }
};
