import React, { useState } from "react";
import { pricingPlans } from "../constants/constant";
import { useStripeContext } from "../context/StripeContext";

const PricingPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const stripePromise = useStripeContext();
  const email = "shakoor@gmail.com";
  const handleSelectPlan = (index) => {
    setSelectedPlan(index);
  };

  const handleGetStarted = async (plan) => {
    // This function will handle the 'Get started' click
    // You can redirect the user, trigger a checkout, or any other logic here.
    // alert(`You selected the ${plan.name} plan. Price: $${plan.price}`);

    setLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;
      const response = await fetch(
        "http://localhost:5000/create-subscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, pricePlan: plan.name }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        const { sessionId } = data;

        // Redirect to Stripe Checkout
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          setError(error.message);
        }
      } else {
        setError(data.error.message);
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setError("An error occurred while creating the subscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
            Designed for business teams like yours
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl">
            We focus on markets where technology, innovation, and capital can
            unlock long-term value.
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              onClick={() => handleSelectPlan(index)}
              className={`flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border 
                ${
                  selectedPlan === index
                    ? "border-blue-600 shadow-lg"
                    : "border-gray-100 shadow"
                } 
                cursor-pointer`}
            >
              <h3 className="mb-4 text-2xl font-semibold">{plan.name}</h3>
              <p className="font-light text-gray-500 sm:text-lg">
                {plan.description}
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">
                  ${plan.price}
                </span>
                <span className="text-gray-500">{plan.billingCycle}</span>
              </div>
              <ul className="mb-8 space-y-4 text-left">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleGetStarted(plan)}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {loading ? "Processing..." : "Get started"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlan;
