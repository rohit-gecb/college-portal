import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setMessage(response.data.message);
      setIsError(false);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      console.log("Login error full:", error.response);
      setMessage(error.response?.data?.message || "Login failed");
      setIsError(true);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      {message && (
        <div className={`message ${isError ? "error-message" : "success-message"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Enter Email" required onChange={(e) => setEmail(e.target.value)} />

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", right: "12px", top: "14px", cursor: "pointer" }}
          >
            👁
          </span>
        </div>

        <button type="submit">Login</button>
      </form>

      <p><Link to="/forgot-password" className="link">Forget Password?</Link></p>
       
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Login;