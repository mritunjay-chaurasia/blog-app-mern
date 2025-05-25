import { Navigate, Routes, Route } from 'react-router-dom';
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import SignupPage from "./pages/unauth/signup/signupPage";
import LoginPage from "./pages/unauth/login/loginPage"
import Dashboard from "./pages/Dashboard/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    </Routes>
  )
}

export default App
