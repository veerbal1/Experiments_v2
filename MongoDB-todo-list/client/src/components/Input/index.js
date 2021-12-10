import React from "react";

const InputWrapper = () => {
  return (
    // Create beautiful input using tailwind classes
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-lg my-8"
      type="text"
      placeholder="Add a todo..."
    />
  );
};

export default InputWrapper;
