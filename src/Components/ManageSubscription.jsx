import React, { useState } from "react";

const ManageSubscription = () => {
  const [status, setStatus] = useState(null);
  const email = "shahid@gmail.com";
  const handlePause = async () => {
    const response = await fetch("http://localhost:5000/pause-subscription", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    setStatus(result.status);
  };

  const handleResume = async () => {
    const response = await fetch("http://localhost:5000/resume-subscription", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    setStatus(result.status);
  };

  const handleCancel = async () => {
    const response = await fetch("http://localhost:5000/cancel-subscription", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    setStatus(result.status);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h3 className="text-xl font-bold mb-4 text-center">
        Manage Subscription
      </h3>
      <div className="space-y-4">
        <button
          onClick={handlePause}
          className="w-full py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          Pause Subscription
        </button>
        <button
          onClick={handleResume}
          className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Resume Subscription
        </button>
        <button
          onClick={handleCancel}
          className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Cancel Subscription
        </button>
      </div>
      {status && (
        <p className="mt-4 text-center text-gray-700 font-medium">
          Subscription Status: {status}
        </p>
      )}
    </div>
  );
};

export default ManageSubscription;
