import './App.css';
import introJs from 'intro.js';
import 'intro.js/introjs.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    showIntro();
  }, []);

  function showIntro() {
    introJs().start();
    introJs().addHints();
  }
  return (
    <div className="App">
      <header className="App-header" data-title="Header" data-intro="This is Header">
        This is first Header
      </header>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <header className="App-header" data-title="Header-2" data-intro="This is Second Header">
        This is second Header
      </header>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <header className="App-header" data-intro="This is third Header">
        This is third Header
      </header>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <p className="para" data-intro="This is a paragraph">
        This is Paragraph
      </p>
    </div>
  );
}

export default App;
