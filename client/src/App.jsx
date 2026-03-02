import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/verifyotp";
import ForgotPassword from "./pages/ForgotPassword";
import VeryfyResetOtp from "./pages/verifyresetotp";
import ResetPassword from "./pages/resetpassword";
import Dashboard from "./pages/Dashboard"; 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-reset-otp" element={<VeryfyResetOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;