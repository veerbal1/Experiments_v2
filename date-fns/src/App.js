import logo from './logo.svg';
import './App.css';
import { format } from 'date-fns';

function App() {
  // 2021-09-13 05:53:56.069181 +0000 EDT
  // Removing the timezone offset makes it UTC
  // const date = new Date(Date.parse('2021-09-13T05:53:56.069181'));
  // console.log(new Date("2021-09-13 05:53:56.069181 +0000 EDT"));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {format(
            new Date('2021-09-13 05:53:56.069181'),
            'eee, MMM dd, yyyy h:mm a'
          )}
          {/* {new Date('2021-09-13 05:53:56.069181').toString()} */}
        </a>
      </header>
    </div>
  );
}

export default App;
