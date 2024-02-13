const mail = require("@sendgrid/mail");
mail.setApiKey(process.env.MAIL_API_KEY);
// const msg = {
//     to: 'destinataire@example.com', // Change to your recipient
//     from: 'expediteur@example.com', // Change to your verified sender
//     subject: 'Sujet du mail',
//     text: 'Contenu du mail',
//     html: '<strong>Contenu du mail en HTML</strong>',
// };
async function sendMail(msg){
    await mail.send(msg);
}
module.exports = sendMail