import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PlansPage from './pages/PlansPage';
import SummaryPage from './pages/SummaryPage';
import { UserProvider } from './contexts/UserContext';

const App = () => {
  return (
    <UserProvider>
      <Router basename="/reto-indra-rimac-main">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
