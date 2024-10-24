import React, { useState } from "react";
import { useStripeContext } from "./context/StripeContext";

const CheckoutForm = () => {
  const stripePromise = useStripeContext();
  const [email, setEmail] = useState("");
  const [pricePlan, setPricePlan] = useState("basic"); // default plan
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const handleSubscription = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const stripe = await stripePromise;
  //     const response = await fetch(
  //       "http://localhost:5000/create-subscription",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ email, pricePlan }),
  //       }
  //     );

  //     const data = await response.json();
  //     if (response.ok) {
  //       const { clientSecret } = data;

  //       // Redirect to Stripe for payment confirmation
  //       const { error } = await stripe.redirectToCheckout({
  //         sessionId: clientSecret,
  //       });

  //       if (error) {
  //         setError(error.message);
  //       }
  //     } else {
  //       setError(data.error.message);
  //     }
  //   } catch (error) {
  //     console.error("Subscription error:", error);
  //     setError("An error occurred while creating the subscription.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubscription = async (e) => {
    e.preventDefault();
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
          body: JSON.stringify({ email, pricePlan }),
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
    <form
      onSubmit={handleSubscription}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Subscribe</h2>

      <div className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <select
          value={pricePlan}
          onChange={(e) => setPricePlan(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="free">Free Plan</option>
          <option value="basic">Basic Plan - $5/month</option>
          <option value="premium">Premium Plan - $10/month</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        {loading ? "Processing..." : "Subscribe"}
      </button>

      {error && <div className="mt-4 text-red-500">{error}</div>}
    </form>
  );
};

export default CheckoutForm;
