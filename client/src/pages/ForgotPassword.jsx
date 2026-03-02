import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/forgot-password",
        { email }
      );

      setMessage(res.data.message);
      setIsError(false);

      setTimeout(() => {
        navigate("/verify-reset-otp", { state: { email } });
      }, 1000);

    } catch (error) {
      setMessage(error.response?.data?.message || "Error occurred");
      setIsError(true);
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>

      {message && (
        <div className={`message ${isError ? "error-message" : "success-message"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your account email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
}

export default ForgotPassword;