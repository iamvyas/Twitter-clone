import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Only needed if using cookies

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user authentication
    const storedUser = localStorage.getItem("user"); // For LocalStorage-based auth
    const token = Cookies.get("token"); // For Cookie-based auth

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (token) {
      // If using JWT cookies, fetch user details from backend
      fetchUserDetails();
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        credentials: "include", // Important for sending cookies
      });

      if (!response.ok) throw new Error("Unauthorized");

      const data = await response.json();
      setUser(data);
    } catch (error) {
      navigate("/login"); // Redirect if unauthorized
    }
  };

  return (
    <div className="homepage">
      <h2>Welcome to Homepage</h2>
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => {
            localStorage.removeItem("user"); // Clear LocalStorage
            Cookies.remove("token"); // Remove Cookie
            navigate("/login");
          }}>
            Logout
          </button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default HomePage;