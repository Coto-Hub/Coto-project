'use strict';

const { Service } = require('@hapipal/schmervice');
const Nodemailer = require('nodemailer');
const Dotenv = require('dotenv');

module.exports = class MailService extends Service {

    async createTransporter() {
        const account = await Nodemailer.createTestAccount();
        Dotenv.config({ path: `${__dirname}\\..\\..\\.env` });
        return await Nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER ?? account.user,
                pass: process.env.SMTP_PASS ?? account.pass
            }
        });
    }
    async sendMail(to, subject, text) {
        const transporter = await this.createTransporter();
        const from = 'no-reply@coto-jsp.com>';
        return await transporter.sendMail({
            from,
            to: to.join(', '),
            subject,
            text
        });
    }
};
