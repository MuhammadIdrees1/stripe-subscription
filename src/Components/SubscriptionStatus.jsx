import React, { useEffect, useState } from "react";

const SubscriptionStatus = ({ email }) => {
  const [status, setStatus] = useState("Fetching...");

  //   useEffect(() => {
  //     // Poll the backend every 10 seconds to check subscription status
  //     const interval = setInterval(async () => {
  //       const res = await fetch(
  //         `http://localhost:5000/check-subscription-status`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ email }),
  //         }
  //       );

  //       const { subscriptionStatus } = await res.json();
  //       setStatus(subscriptionStatus || "No active subscription");
  //     }, 10000); // Poll every 10 seconds

  //     return () => clearInterval(interval); // Cleanup on component unmount
  //   }, [email]);

  return (
    <div className="max-w-md mx-auto p-6 mt-6 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-semibold text-center">
        Your Subscription Status: {status}
      </h3>
    </div>
  );
};

export default SubscriptionStatus;
