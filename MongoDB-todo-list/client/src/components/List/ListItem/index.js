import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const ListItem = ({ handleDelete, id, disabled, children }) => {
  return (
    // Create a beautiful list item using tailwind classes
    <li
      className={`shadow appearance-none border rounded my-1 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline flex justify-between items-center `}
    >
      <span>{children}</span>
      {/* If disable then hide button */}
      {disabled ? null : (
        <DeleteButton handleDelete={handleDelete} id={id} disabled={disabled} />
      )}
    </li>
  );
};

const DeleteButton = ({ id, disabled }) => {
  const queryClient = useQueryClient();

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/todos/${id}`,{
      method: 'DELETE',
    }).then(() => {
      queryClient.invalidateQueries('list');
    });
  };

  return (
    // Create a beautiful list item using tailwind classes
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded-full cursor-pointer"
      onClick={() => handleDelete(id)}
      disabled={disabled}
    >
      &times;
    </button>
  );
};

export default ListItem;
