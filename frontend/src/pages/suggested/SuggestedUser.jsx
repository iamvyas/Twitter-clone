import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SuggestedUser = ()=>{
    const [sUser, setUser] = useState(null);
    useEffect(() =>{
        fetchUserDetails();
      }, [])
      const updateFunction = async (userF) => {
        
        const sUsers = await fetch("http://localhost:5000/api/users/follow/"+userF, {
            method: "POST",
            credentials: "include", // Important for sending cookies
          });
          fetchUserDetails();
          console.log("follow success");
      }
      const fetchUserDetails = async () => {
        try {

          const sUsers = await fetch("http://localhost:5000/api/users/suggested", {
            method: "GET",
            credentials: "include", // Important for sending cookies
          });
    
          if (!sUsers.ok) throw new Error("Unauthorized");
    
          const data = await sUsers.json();
          setUser(data);
        } catch (error) {
          navigate("/login"); // Redirect if unauthorized
        }
      };
      return (
        <>
          <div className="col-2">
            SUGGESTED USERS:
            {sUser ? (
              sUser.map((post) => ( 
                <div key={post._id}>
                  <p>{post.username} <button onClick={()=>updateFunction(post._id)} >follow</button> </p>
                  
                </div>
              ))
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        </>
      );
}

export default SuggestedUser;