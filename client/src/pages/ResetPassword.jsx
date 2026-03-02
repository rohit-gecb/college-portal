import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsError(true);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/reset-Password",
        { email, newPassword }
      );

      setMessage(res.data.message);
      setIsError(false);

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      setMessage(error.response?.data?.message || "Error occurred");
      setIsError(true);
    }
  };

  return (
    <div className="auth-container">
      <h2>Set New Password</h2>

      {message && (
        <div className={`message ${isError ? "error-message" : "success-message"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          required
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;