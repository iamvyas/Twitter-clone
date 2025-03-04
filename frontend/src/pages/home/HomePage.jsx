import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Only needed if using cookies
import HandleLogout from "../auth/logout/LogOut";
import PostTweet from "./PostTweet";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() =>{
    fetchUserDetails();
  }, []) 

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
      <PostTweet onTweetPosted={fetchUserDetails} /> 
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          
          <br />
          <div className="tweetbox">
      {tweets.map((post) => (
        <div key={post._id} >
          <p>{post.user.fullName} @{post.user.username}</p>
          <p>{post.text}</p>
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