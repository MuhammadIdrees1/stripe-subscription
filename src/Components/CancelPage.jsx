import React from "react";
import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <div class="bg-gray-100 h-[calc(100vh-80px)] grid place-items-center ">
      <div className=" h-fit w-fit">
        <div class="bg-white p-6  md:mx-auto">
          <svg viewBox="0 0 24 24" class="text-red-600 w-16 h-16 mx-auto my-6">
            <path
              fill="currentColor"
              d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.3 15.3a1 1 0 0 1-1.42 0L12 13.41l-1.88 1.88a1 1 0 0 1-1.42-1.42L10.59 12l-1.88-1.88a1 1 0 1 1 1.42-1.42L12 10.59l1.88-1.88a1 1 0 1 1 1.42 1.42L13.41 12l1.88 1.88a1 1 0 0 1 0 1.42z"
            />
          </svg>

          <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Denied!
            </h3>
            <p class="text-gray-600 my-2">
              Unfortunately, your payment could not be processed.
            </p>
            <p> Please try again or contact support for assistance.</p>
            <div class="py-10 text-center">
              <Link
                to="/"
                class="px-12 bg-red-600 hover:bg-red-500 text-white font-semibold py-3"
              >
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
