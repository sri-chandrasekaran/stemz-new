import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { sendConfirmationEmail } from './emailsService';

const PaymentComponent = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const initialOptions = {
    clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: "USD",
  };

  console.log("PayPal Client ID:", process.env.REACT_APP_PAYPAL_CLIENT_ID);

  const handlePaymentSuccess = (details) => {
    console.log("Payment Success:", details);
    const payerEmail = details.payer.email_address;
    const orderDetails = {
      transactionId: details.id,
      amount: details.purchase_units[0].amount.value,
      payerName: details.payer.name.given + ' ' + details.payer.name.surname,
    };

    sendConfirmationEmail(payerEmail, orderDetails)
      .then(() => console.log('Confirmation email sent to customer'))
      .catch((error) => console.error('Error sending email to customer:', error));

    sendConfirmationEmail('course-boxes@stemzlearning.org', orderDetails)
      .then(() => console.log('Confirmation email sent to yourself'))
      .catch((error) => console.error('Error sending email to yourself:', error));
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={(data, actions) => {
          console.log("Creating Order");
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '0.01'
              }
            }]
          });
        }}
        onApprove={(data, actions) => {
          console.log("Payment Approved");
          return actions.order.capture().then((details) => {
            alert(`Transaction completed by ${details.payer.name.given}`);
            setPaymentStatus(`Transaction completed by ${details.payer.name.given}`);
            handlePaymentSuccess(details);
          });
        }}
        onError={(err) => {
          console.error("Error:", err);
          alert('An error occurred during the transaction');
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaymentComponent;
