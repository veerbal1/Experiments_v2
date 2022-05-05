import './App.css';
import { Button } from '@mantine/core';
import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const handleClick = () => {
    console.log('clicked');
  };

  useEffect(() => {
    setInterval(() => {
      console.log('interval');
      setLoading(!loading);
    }, 4000);
  }, []);

  return (
    <div className="App">
      <Button onClick={handleClick} loading={loading}>
        Hello Veerbal
      </Button>
    </div>
  );
}

export default App;
