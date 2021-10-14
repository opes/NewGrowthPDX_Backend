const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');


module.exports = class SendMailService {
    static async sendTestEmail({ from, to, subject, html }) {
        
        const mailPreview = await sendEmail({
            from: "some plant user email here",
            to: User.email,
            subject: 'I\'m interested in your plant',
            html: `<h1>Hello, ${User.name}!</h1>`,
        });

        return { mailPreview };
    } 
};