import React, { useContext, useEffect } from 'react';
import { Context } from './Context';
import ShowNumber from './ShowNumber';

const Child = () => {
  const { setState } = useContext(Context);
  //   Clear context state on unmount
  useEffect(() => {
    return () => {
      setState({
        number1: 0,
        number2: 0,
      });
    };
  }, []);
  return (
    <div>
      <ShowNumber />
      <h1>Child</h1>
      <ul>
        {[1, 2, 3].map((item) => {
          return <ListItem key={item} item={item} />;
        })}
      </ul>
    </div>
  );
};

const ListItem = () => {
  const { setState } = useContext(Context);
  const [myState, setMyState] = React.useState(0);
  useEffect(() => {
    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        // Add in previous state
        number1: prevState.number1 + 1,
        // Add in new state
        number2: prevState.number2 + 1,
      }));
      setMyState(1);
    }, 100);
  }, []);
  return (
    <div>
      <h1>List Item: {myState}</h1>
    </div>
  );
};
export default Child;
