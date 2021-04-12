// eslint-disable-next-line strict
const Joi = require('joi');

module.exports = {
    allObject() {
        return Joi.object({
            firstName: Joi.string().required().min(3).example('Thomas').description('Prénom'),
            lastName: Joi.string().required().min(3).example('Marty').description('Nom'),
            password: Joi.string().required().min(8).example('&-#Coto#-&').description('Password'),
            username: Joi.string().example('Coto').description('Username'),
            mail: Joi.string().example('thomas.marty@etu.unilim.fr').regex(/^.*?@.*?\..*?$/).description('Adresse mail')
        });
    }
};
