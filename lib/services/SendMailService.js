const sendEmail = require('../utils/sendEmail');

module.exports = class SendMailService {
  static async sendTestEmail({ from, to }) {
    const mailPreview = await sendEmail({
      from,
      to,
      subject: 'I\'m interested in your plant',
      html: '<h1>Hello I saw your plant posting and am very interested. You can reach me at this email to discuss meetup details</h1>',
    });

    return { mailPreview };
  }
};
