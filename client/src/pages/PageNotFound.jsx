import React from "react";

const PageNotFound = () => {
  return (
    <div className="h-screen w-full">
      <div className="flex h-full w-full flex-col items-center justify-center bg-neutral-100">
        <img
          src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?semt=ais_hybrid&w=740"
          alt="404 error"
          className="h-auto w-full max-w-md rounded-lg shadow-lg"
        />
        <h1 className="mt-6 text-3xl font-bold text-neutral-700">
          404 - Page Not Found
        </h1>
        <p className="mt-2 text-neutral-500">
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
