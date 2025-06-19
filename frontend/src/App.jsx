import { Navigate, Routes, Route } from 'react-router-dom';
import PublicRoute from "./routes/PublicRoute";
import './index.css'
import { Outlet } from 'react-router-dom';
import PrivateRoute from "./routes/PrivateRoute";
import SignupPage from "./pages/unauth/signup/signupPage";
import LoginPage from "./pages/unauth/login/loginPage"
import Dashboard from "./pages/Dashboard/dashboard";
import ForgotPage from './pages/unauth/forgot-password/forgot-page';
import ResetPassword from './pages/unauth/reset-password/reset-password';
import SideMenu from './components/SideMenu/SideMenu';
import Chatbot from './pages/Chatbot/Chatbot';


function App() {
  return (
    <div className='app-page'>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPage /></PublicRoute>} />
        <Route path="/reset-password/:resetToken" element={<PublicRoute><ResetPassword /></PublicRoute>} />
        
        {/* Nesting under layout (SideMenu) */}
        <Route element={<SideMenu />}>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/chatbot" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
        </Route>
      </Routes>
    </div>
  );
}


export default App
