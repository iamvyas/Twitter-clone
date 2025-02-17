import { set } from "mongoose";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const [user, setUser] = useState(null);
  const [notif, setNotif] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() =>{
    fetchUserDetails();
  }, [location.pathname]) 

  const fetchUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        credentials: "include", // Important for sending cookies
      });
      console.log("pre notif");
      const responseNotifs = await fetch("http://localhost:5000/api/notifications/", {
        method: "GET",
        credentials: "include", // Important for sending cookies
      });
      
      console.log("post notif");
      if (!response.ok) throw new Error("Unauthorized");

      const data = await response.json();
      setUser(data);
      const dataNotifs = await responseNotifs.json();
      setNotif(dataNotifs);
    } catch (error) {
      navigate("/login"); // Redirect if unauthorized
    }
  };
  
  return (
    <div className="notifications"> 
    Notifications:
      {user ? (
        <div>
          <p><strong>Notifications for :</strong> {user.username}</p>
          <br />
          <div className="tweetbox">
      {notif.map((post) => (
        <div key={post._id} >
          <p>{post.from.username} {post.type} you</p>
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

export default Notifications;