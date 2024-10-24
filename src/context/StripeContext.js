import React, { createContext, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";

const StripeContext = createContext();

export const StripeProvider = ({ children }) => {
  const stripePromise = loadStripe(
    "pk_test_51Ng5EQJxOIuzERdmRswAYi34Pg08sqEc0TXfWECps3YI4HAAfIBO9k5SXb7Uz2aN7a1eXTAC263dWPaM8yn4REr300076C7Wbo"
  );

  return (
    <StripeContext.Provider value={stripePromise}>
      {children}
    </StripeContext.Provider>
  );
};

export const useStripeContext = () => {
  return useContext(StripeContext);
};
