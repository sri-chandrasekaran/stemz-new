import React from 'react';
import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { sendConfirmationEmail } from './emailsService';


const PaymentComponent = () => {
const [paymentStatus, setPaymentStatus] = useState(null);

  const initialOptions = {
    clientId: "YOUR_CLIENT_ID",
    currency: "USD",
  };


  const handlePaymentSuccess = (details) => {
    const payerEmail = details.payer.email_address;
    const orderDetails = {
      transactionId: details.id,
      amount: details.purchase_units[0].amount.value,
      payerName: details.payer.name.given + ' ' + details.payer.name.surname,
    };

    // Send email to customer
    sendConfirmationEmail(payerEmail, orderDetails)
      .then(() => console.log('Confirmation email sent to customer'))
      .catch((error) => console.error('Error sending email to customer:', error));

    // Send email to yourself
    sendConfirmationEmail('course-boxes@stemzlearning.org', orderDetails)
      .then(() => console.log('Confirmation email sent to yourself'))
      .catch((error) => console.error('Error sending email to yourself:', error));
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '0.00'
              }
            }]
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Transaction completed by ${details.payer.name.given}`);
            setPaymentStatus(`Transaction completed by ${details.payer.name.given}`);
            handlePaymentSuccess(details);
          });
        }}
        onError={(err) => {
          console.error(err);
          alert('An error occurred during the transaction');
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaymentComponent;
