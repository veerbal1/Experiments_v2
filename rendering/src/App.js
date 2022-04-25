import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Child from './Child';
import ContextWrapper from './Context';

function App() {
  return (
    <div className="App">
      <ContextWrapper>
        <Router>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/child">Child</Link>
            </li>
          </ul>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/child" element={<Child />} />
          </Routes>
        </Router>
      </ContextWrapper>
    </div>
  );
}

export default App;
