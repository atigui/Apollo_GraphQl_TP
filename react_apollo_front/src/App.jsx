import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComptesList from './ComptesList';
import TransactionsPage from './TransactionsPage';
import Dashboard from './Dashboard'; 
import CreateTransaction from './CreateTransaction'; 
import Navigation from './Navigation';
import CreateCompte from './CreateCompte';

function App() {
  return (
    <Router>
      <Navigation /> 
      <Routes>
        <Route path="/" element={<ComptesList />} />
        <Route path="/transactions/:compteId" element={<TransactionsPage />} />
        <Route path="/transactions" element={<CreateTransaction />} />
        <Route path="/compte" element={<CreateCompte />} />
      </Routes>
    </Router>
  );
}

export default App;
