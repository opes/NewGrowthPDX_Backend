const sendEmail = require('../utils/sendEmail');
// const User = require('../models/User');


module.exports = class SendMailService {
    static async sendTestEmail({ from, to }) {
        
        const mailPreview = await sendEmail({
            from: from,
            to: to,
            subject: 'I\'m interested in your plant',
            html: `<h1>Hello World!</h1>`,
        });

        return { mailPreview };
    } 
};