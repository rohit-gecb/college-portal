import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    branch: "",
    group: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://college-portal-hjqi.onrender.com/api/signup",
        formData
      );

      setMessage(response.data.message);
      setIsError(false);

      setTimeout(() => {
        navigate("/verify-otp", { state: { email: formData.email } });
      }, 1000);

    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
      setIsError(true);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      {message && (
        <div className={`message ${isError ? "error-message" : "success-message"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", right: "12px", top: "14px", cursor: "pointer" }}
          >
            👁
          </span>
        </div>

        <select name="role" onChange={handleChange}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <select name="branch" onChange={handleChange} required>
          <option value="">Select Branch</option>
          <option value="CSE">CSE</option>
          <option value="ME">ME</option>
          <option value="PE">PE</option>
          <option value="EE">EE</option>
          <option value="ECE">ECE</option>
          <option value="CHE">CHE</option>
          <option value="Civil">Civil</option>
        </select>

        <select name="group" onChange={handleChange} required>
          <option value="">Select Group</option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
        </select>

        <button type="submit">Signup</button>
      </form>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Signup;