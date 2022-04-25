import React, { useContext } from 'react';
import { Context } from './Context';

const ShowNumber = () => {
  const { state } = useContext(Context);
  return (
    <>
      <h1>Number 1:- {state.number1}</h1>
      <h1>Number 2:- {state.number2}</h1>
    </>
  );
};

export default ShowNumber;
