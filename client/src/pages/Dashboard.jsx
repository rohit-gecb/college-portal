import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");    
        if (!token) {
          navigate("/");
        }
        }, [navigate]);
    return (
        <div>
            <h1>Welcome to Rohit's OTP Base Project</h1>
            
        </div>
    );
}  

export default Dashboard;