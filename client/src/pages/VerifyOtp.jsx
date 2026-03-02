import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/verify-otp",
        {
          email,
          otp: otp.join("")
        }
      );

      setMessage(response.data.message);
      setIsError(false);

      // 🔥 Save token & user
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      setMessage(error.response?.data?.message || "Verification failed");
      setIsError(true);
    }
  };

  return (
    <div className="auth-container">
      <h2>Verify Your OTP</h2>

      {message && (
        <div className={`message ${isError ? "error-message" : "success-message"}`}>
          {message}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0" }}>
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            style={{
              width: "45px",
              height: "50px",
              textAlign: "center",
              fontSize: "18px",
              borderRadius: "8px",
              border: "1px solid #ddd"
            }}
          />
        ))}
      </div>

      <button onClick={handleVerify}>Verify OTP</button>
    </div>
  );
}

export default VerifyOtp;