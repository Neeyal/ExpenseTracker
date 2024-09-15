import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from './pages/User';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<User />} />
      </Routes>
    </Router>
  );
};

export default App;
