import React from "react";
import ListItem from "./ListItem";
import { useQuery } from "react-query";

const List = () => {
  const { data, isLoading, isError } = useQuery("list", () =>
    fetch("http://localhost:4000/todos").then((res) => res.json())
  );

  return (
    <ul className="w-full">
      {isLoading ? (
        <ListItem disabled>Loading...</ListItem>
      ) : isError ? (
        <ListItem>Error...</ListItem>
      ) : (
        data.map((item) => <ListItem key={item._id} id={item._id}>{item.todo}</ListItem>)
      )}
    </ul>
  );
};

export default List;
