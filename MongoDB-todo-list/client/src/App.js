import "./App.css";
import React, { useState } from "react";
import ButtonWrapper from "./components/Button";
import InputWrapper from "./components/Input";
import List from "./components/List";
import { useMutation, useQueryClient } from "react-query";

function App() {
  return (
    <div className="main w-screen h-screen bg-cover bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-start">
      {/* Top section */}
      <TopSection />
      {/* Bottom section */}
      <BottomSection />
    </div>
  );
}

const TopSection = () => {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const { mutate, isLoading } = useMutation(
    (todoItem) => {
      console.log("todoItem", todoItem);
      return fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoItem),
      }).then((res) => res.json());
    },
    {
      onSuccess: () => {
        setValue("");
        queryClient.invalidateQueries("list");
      },
    }
  );

  const handleAdd = () => {
    if (value) {
      console.log({
        todo: value,
      });
      mutate({
        todo: value,
      });
      setValue("");
    }
  };

  console.log(isLoading, "isLoading");

  return (
    <div className="container mx-auto flex items-center justify-center">
      <InputWrapper value={value} onChange={(e) => setValue(e.target.value)} />
      <ButtonWrapper onClick={handleAdd}>Add</ButtonWrapper>
    </div>
  );
};

const BottomSection = () => {
  return (
    <div className="container mx-auto flex items-center justify-center">
      <List />
    </div>
  );
};

export default App;
