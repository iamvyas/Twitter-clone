import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Only needed if using cookies
import HandleLogout from "../auth/logout/LogOut";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() =>{
    fetchUserDetails();
  }) 
  /*
  const handleLogout = async () => {
    try {
      console.log("pre axios log out");
      

      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "GET",
        credentials: "include", // Important for sending cookies
      });
      console.log("post axios log out");
      // Clear user state
      setUser(null);
      navigate("/login"); // Redirect to login after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  */
  const fetchUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        credentials: "include", // Important for sending cookies
      });
    
      const responseTweets = await fetch("http://localhost:5000/api/posts/all", {
        method: "GET",
        credentials: "include", // Important for sending cookies
      });

      if (!response.ok) throw new Error("Unauthorized");

      const data = await response.json();
      const dataTweets = await responseTweets.json();
      setUser(data);
      setTweets(dataTweets);
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
          <HandleLogout />
          <br />
          <div className="p-4 space-y-4">
      {tweets.map((post) => (
        <div key={post._id} >
          <p>Username: {post.user.username}</p>
          <p>Text: {post.text}</p>
        </div>
      ))}
    </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default HomePage;