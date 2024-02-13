const nodemailer= require('nodemailer')

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "my.randrianantoandro@gmail.com",
    pass: "slvaguwmbnxhlfzl",
  },
});

function HTML_TEMPLATE (text) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>NodeMailer Email Template</title>
          <style>
            .container {
              width: 100%;
              height: 100%;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .email {
              width: 80%;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
            }
            .email-header {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
            .email-body {
              padding: 20px;
            }
            .email-footer {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email">
              <div class="email-header">
                <h1>Coiffure Service</h1>
              </div>
              <div class="email-body">
                <p>${text}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  }

async function sendMail  (mailDetails, callback) {
    try {
      const info = await transporter.sendMail(mailDetails)
      callback(info);
    } catch (error) {
      console.log(error);
    } 
  };
module.exports = {
    sendMail,
    HTML_TEMPLATE
}