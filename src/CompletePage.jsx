import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";

const CompletePage = () => {
  const stripe = useStripe();
  const [status, setStatus] = useState("default");

  useEffect(() => {
    if (!stripe) return;
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      setStatus(paymentIntent.status);
    });
  }, [stripe]);

  return (
    <div>
      <h2>Subscription Status: {status}</h2>
      <a href="/checkout">Go Back</a>
    </div>
  );
};

export default CompletePage;
