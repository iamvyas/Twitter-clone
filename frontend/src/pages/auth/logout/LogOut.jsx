import { useState ,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../GlobalContext";

const HandleLogout = () => {
    let {authStatus, authStatusLoader} = useContext(GlobalContext);
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
          console.log("pre axios log out");
          const response = await fetch("http://localhost:5000/api/auth/logout", {
            method: "GET",
            credentials: "include", // Important for sending cookies
          });
          console.log("post axios log out");
          authStatusLoader(false);
          // Clear user state
          navigate("/login"); // Redirect to login after logout
        } catch (err) {
          console.error("Logout failed:", err);
        }
      };

    return(
        <div>
            <button onClick={handleLogout}>
            Logout
            </button>
        </div>
    )
  };

export default HandleLogout;