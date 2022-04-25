import React, { createContext } from 'react';

export const Context = createContext();

const ContextWrapper = ({ children }) => {
  let [state, setState] = React.useState({
    number1: 0,
    number2: 0,
  });
  return (
    <Context.Provider value={{ state, setState }}>{children}</Context.Provider>
  );
};

export default ContextWrapper;
