const sendEmail = require('../utils/sendEmail');
// const User = require('../models/User');

module.exports = class SendMailService {
  static async sendTestEmail({ from, to }) {
    const mailPreview = await sendEmail({
      from: from,
      to: to,
      subject: "I'm interested in your plant",
      html: '<h1>Hello I saw your plant posting and am very intersted. You can reach me at this email to discuss meetup details</h1>',
    });

    return { mailPreview };
  }
};
