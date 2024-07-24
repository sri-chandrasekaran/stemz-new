import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import emailjs from 'emailjs-com';

const PaymentComponent = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const initialOptions = {
    clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: "USD",
  };

  const handlePaymentSuccess = async (details) => {
    console.log("Payment Success:", details);
    const orderDetails = {
      transactionId: details.id,
      amount: details.purchase_units[0].amount.value,
      payerName: `${details.payer.name.given_name} ${details.payer.name.surname}`,
    };

    console.log("Order Details:", orderDetails);

    try {
      await sendConfirmationEmail(details.payer.email_address, orderDetails);
      console.log('Confirmation email sent to customer');
    } catch (error) {
      console.error('Error sending email to customer:', error);
    }
  };

  const sendConfirmationEmail = async (email, orderDetails) => {
    const templateParams = {
      to_email: email,
      to_name: orderDetails.payerName,
      from_name: 'STEMz Learning',
      message: `Thank you for your order! Your order number is ${orderDetails.transactionId}. Paid Amount: ${orderDetails.amount}.`
    };

    emailjs.send(
      'service_xsextpm', 
      'template_ytjh9hv',
      templateParams,
      'IoyShFPhY6ivY-u_g'
    ).then((response) => {
      console.log('Email successfully sent!', response.status, response.text);
    }).catch((error) => {
      console.error('Failed to send email:', error);
    });
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
              },
              shipping: {
                address: {
                  address_line_1: '1234 Test St',
                  address_line_2: 'Apt 1',
                  admin_area_2: 'Test City',
                  admin_area_1: 'CA',
                  postal_code: '90210',
                  country_code: 'US'
                }
              }
            }]
          });
        }}
        onApprove={(data, actions) => {
          console.log("Payment Approved");
          return actions.order.capture().then((details) => {
            console.log("Payment Details:", details);
            if (details && details.payer && details.payer.name) {
              alert(`Transaction completed by ${details.payer.name.given_name}`);
              setPaymentStatus(`Transaction completed by ${details.payer.name.given_name}`);
              handlePaymentSuccess(details);
            } else {
              console.error("Unexpected payment details structure:", details);
              alert('An error occurred during the transaction');
            }
          }).catch((err) => {
            console.error("Error capturing order:", err);
            alert('An error occurred during the transaction');
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
