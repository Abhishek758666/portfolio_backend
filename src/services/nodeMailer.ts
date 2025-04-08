import nodemailer, { Transporter } from "nodemailer";
import { envConfig } from "../config/envConfig";

class Mailer {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: envConfig.SMTP_HOST,
      port: envConfig.SMTP_PORT,
      auth: {
        user: envConfig.SMTP_USER,
        pass: envConfig.SMTP_PASSWORD,
      },
      secure: true,
      tls: {
        rejectUnauthorized: true,
      },
    } as nodemailer.TransportOptions);
  }

  async sendMail(
    to: string,
    subject: string,
    text: string,
    html?: string
  ): Promise<void> {
    const mailOptions = {
      from: `${envConfig.EMAIL_FROM_NAME}, ${envConfig.EMAIL_FROM_ADDRESS}`,
      to,
      subject,
      text,
      html: html ?? text,
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent:", info.messageId);
      return info;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
}

export default new Mailer();

// ------------email templates----------------------
export const NoteVerificationTemplate = (
  userName: string,
  message: string,
  ImageId: string,
  noteId: string
) => {
  const imageLink = `${ImageId}`;
  const verifyLink = `http://localhost:3000/verify/${noteId}`;
  const rejectLink = `http://localhost:3000/delete/${noteId}`;

  const subject = `New Visitor Note Requires Your Approval`;

  const text = `
      Hi Abhishek,
      
      ${userName} has left a new note in your portfolio's visitor section.
      Message: "${message}"
      
      Please verify whether to show this note in your portfolio or not.
      
      Approve: {${verifyLink}}
      Reject: {${rejectLink}}
    `;

  const html = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
              
              body {
                  font-family: 'Poppins', sans-serif;
                  background-color: #f5f7fa;
                  margin: 0;
                  padding: 0;
                  color: #333;
              }
              
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  background: white;
                  border-radius: 12px;
                  overflow: hidden;
                  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
              }
              
              .header {
                  background: linear-gradient(135deg,rgb(108, 110, 117),rgb(40, 38, 41));
                  color: white;
                  padding: 25px 30px;
                  text-align: center;
              }
              
              .header h1 {
                  margin: 0;
                  font-size: 24px;
                  font-weight: 600;
              }
              
              .content {
                    padding: 30px;
              }
              
              .greeting {
                  font-size: 18px;
                  margin-bottom: 20px;
                  color: #444;
              }
              
              .note-box {
                  background: #f8f9ff;
                  border-left: 4px solid rgb(79, 84, 101);
                  padding: 20px;
                  border-radius: 8px;
                  margin: 25px 0;
              }
              
              .note-author {
                  font-weight: 500;
                  color: #555;
                  margin-bottom: 8px;
                  display: flex;
                  align-items: center;
              }
              
              .note-author:before {
                  content: "👤";
                  margin-right: 8px;
              }
              
              .note-message {
                  font-size: 16px;
                  line-height: 1.6;
                  color: #333;
                  background: white;
                  padding: 15px;
                  border-radius: 6px;
                  border: 1px solid #eee;
              }
              
              .button-container {
                  display: flex;
                  justify-content: center;
                  gap: 15px;
                  margin: 30px 0;
              }
              
              .button {
                  padding: 12px 25px;
                  border-radius: 6px;
                  text-decoration: none;
                  font-weight: 500;
                  font-size: 15px;
                  transition: all 0.3s ease;
                  text-align: center;
                  min-width: 120px;
              }
              
              .approve {
                  background-color:rgb(35, 237, 133);
                  color: white;
              }
              
              .approve:hover {
                  background-color: rgb(35, 237, 133);
                  transform: translateY(-2px);
              }
              
              .reject {
                  background-color: #f44336;
                  color: white;
              }
              
              .reject:hover {
                  background-color: #d32f2f;
                  transform: translateY(-2px);
              }
              
              .footer {
                  text-align: center;
                  padding: 20px;
                  color: #777;
                  font-size: 13px;
                  border-top: 1px solid #eee;
              }
              
              .signature {
                  margin-top: 25px;
                  font-style: italic;
                  color: #666;
              }
              
              .note-image-placeholder {
                  background: #f0f0f0;
                  width:max-content;
                  margin: 0 auto;
                  height: 150px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-radius: 6px;
                  margin: 15px 0;
                  color: #888;
                  font-size: 14px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>New Visitor Note</h1>
              </div>
              
              <div class="content">
                  <div class="greeting">
                      Hi Abhishek,
                  </div>
                  
                  <p>You've received a new note in your portfolio's visitor section that requires your approval:</p>
                  
                  <div class="note-box">
                      <div class="note-author">
                          From: ${userName}
                      </div>
                      
                      <div class="note-image-placeholder">
                          <img src=${imageLink} />
                      </div>
                      
                      <div class="note-message">
                          "${message}"
                      </div>
                  </div>
                  
                  <p>Would you like to approve this note to appear in your portfolio?</p>
                  
                  <div class="button-container">
                      <a href=${verifyLink} class="button approve">Approve</a>
                  </div>

                  <div class="button-container">
                      <a href=${verifyLink} class="button reject">Reject</a>
                  </div>
                  
                  <div class="signature">
                      Best regards,<br>
                      Your Portfolio System
                  </div>
              </div>
              
              <div class="footer">
                  <p>This is an automated message. Please do not reply directly to this email.</p>
                  <p>© ${new Date().getFullYear()} Your Portfolio. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `;

  return { subject, text, html };
};
