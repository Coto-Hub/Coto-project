// eslint-disable-next-line strict
const Joi = require('joi');

module.exports = {
    allObject() {
        return Joi.object({
            title: Joi.string().min(3).example('RRRrrrr!!!').description('Titre'),
            description: Joi.string().min(10).example('Il y a 35 000 ans, à l\'âge de pierre, deux tribus voisines vivaient en paix… à un cheveu près. Pendant que la tribu des Cheveux Propres coulait des jours paisibles en gardant pour elle seule le secret de la formule du shampooing, la tribu des Cheveux Sales se lamentait.').description('Description'),
            releaseDate: Joi.date().example(new Date('2004-01-28')).description('Date de sortie'),
            director: Joi.string().min(3).example('Alain Chabat').description('Réalisateur')
        });
    }
};
