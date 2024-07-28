import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Contracts from './components/Contracts';
import CreateContract from './components/CreateContract';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contracts" element={<Contracts />} />
        <Route path="/create-contract" element={<CreateContract />} />
      </Routes>
    </div>
  );
}

export default App;

