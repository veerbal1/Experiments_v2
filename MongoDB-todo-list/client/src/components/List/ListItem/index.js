import React from "react";

const ListItem = ({ children }) => {
  return (
    // Create a beautiful list item using tailwind classes
    <li className="shadow appearance-none border rounded my-1 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline">{children}</li>
  );
};

export default ListItem;
