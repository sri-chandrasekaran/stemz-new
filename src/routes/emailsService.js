// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   },
// });

// const sendConfirmationEmail = (to, orderDetails) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to,
//     subject: 'Order Confirmation',
//     text: `Thank you for your order! We will have a day to pick up boxes on SOME_DAY AT SOME_LOCATION`,
//     html: `<strong>Thank you for ordering with STEMz Learningg!</strong>`,
//   };

//   return new Promise((resolve, reject) => {
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//         reject(error);
//       } else {
//         console.log('Email sent:', info.response);
//         resolve(info);
//       }
//     });
//   });
// };

// module.exports = { sendConfirmationEmail };
