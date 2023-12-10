import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GatewayList from './components/GatewayList';
import GatewayDetails from './components/GatewayDetails';
import AddGatewayForm from './pages/AddGatewayForm';
import '../src/css/app.css'; // Import the CSS file

function App() {
  const [gateways, setGateways] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/gateway/all')
      .then(res => res.json())
      .then(data => {
        setGateways(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [gateways]);

  return (
    <Router>
      <div className="App">
        <h1>Gateway Management</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/gateways/new">Add New Gateway</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<GatewayList gateways={gateways} />} />
          <Route
            path="/gateways/:serialNumber"
            element={<GatewayDetails gateways={gateways} />}
          />
          <Route path="/gateways/new" element={<AddGatewayForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
