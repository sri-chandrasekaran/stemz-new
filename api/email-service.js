const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
  const { email, orderDetails } = req.body;

  const msg = {
    to: email,
    from: 'stemz.learning@gmail.com',
    subject: 'Order Confirmation',
    text: `Thank you for your order! Your order number is ${orderDetails.transactionId}. Amount: ${orderDetails.amount}.`
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
