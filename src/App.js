// src/App.js
import React from "react";
import { StripeProvider } from "../src/context/StripeContext";
import CheckoutForm from "./CheckoutForm";
import SubscriptionStatus from "./Components/SubscriptionStatus";
import ManageSubscription from "./Components/ManageSubscription";
import PricingPlan from "./Components/PricingPlan";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import SuccessPage from "./Components/SuccessPage";
import CancelPage from "./Components/CancelPage";

const App = () => {
  return (
    <StripeProvider>
      <Header />
      <Routes>
        <Route path="/" element={<PricingPlan />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
      {/* <div className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-3xl p-6 bg-white flex gap-3 shadow-md rounded-lg">
          <CheckoutForm />
          <div className="mt-6">
            <SubscriptionStatus />
            <ManageSubscription />
          </div>
        </div>
      </div> */}
    </StripeProvider>
  );
};

export default App;
