import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import WalletPage from './pages/dashboard/Dashboard';
import SuccessPage from './pages/auth/oAuthSuccess';
import ErrorPage from './pages/auth/oAuthError';
import TransactionDetailsPage from './pages/dashboard/components/TransactionDetails';
import ForgetPassword from './pages/auth/ForgetPassword';
import ResetPassword from './pages/auth/ResetPassword';
import ProtectedRoute from './components/private-route';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/auth/success" element={<SuccessPage />} />
        <Route path="/auth/error" element={<ErrorPage />} />
        
        {/* Protecting dashboard routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
          <WalletPage />
          </ProtectedRoute>
          } />
        <Route path="/dashboard/wallet/transaction/:id" element={
          <ProtectedRoute>
          <TransactionDetailsPage />
          </ProtectedRoute>
          } />

      </Routes>
    </Router>
  );
}

export default App;
