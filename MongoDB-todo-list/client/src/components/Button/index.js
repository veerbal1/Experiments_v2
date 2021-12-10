import React from "react";

const ButtonWrapper = ({ children, ...props }) => {
  return (
    // Create a beautiful button using tailwind classes
    <button
      className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mx-2"
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonWrapper;
