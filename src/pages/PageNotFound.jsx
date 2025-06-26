import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-2">
        Oops! The page you're looking for doesn't exist.
      </p>
      <p className="text-gray-400 mb-6">It might have been moved or deleted.</p>
      <Link
        to="/"
        className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition"
      >
        Go back home
      </Link>
    </div>
  );
}

export default PageNotFound;
