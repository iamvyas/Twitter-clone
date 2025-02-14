import {Route , Routes} from 'react-router-dom';
import { useEffect, useState } from "react";
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/login/LoginPage';
import SignUpPage from './pages/auth/signup/SignUpPage';
import HandleLogout from './pages/auth/logout/LogOut';
import SuggestedUser from './pages/suggested/SuggestedUser';
import NavBar from './pages/navbar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import "bootstrap-icons/font/bootstrap-icons.css";


function App() {
  let [authStatus, authStatusLoader] = useState(false);
  
  useEffect(() =>{
    console.log("Running useEffect - Checking Auth...");

    checkAuth();  
  });
  const checkAuth = async ()=> {
        try{
          console.log("fetch call check");
          let response = await fetch("http://localhost:5000/api/auth/me", {
            method: "GET",
            credentials: "include", // Important for sending cookies
          });
    
          if (response.ok) {
            console.log("auth check cleared");
            authStatusLoader(true);}
          else{
            console.log("auth check not cleared");
          }
        }catch(error){
          console.log("exception");
        }
      
    
  };
  return (
    <div class="container">
      <div class="row">
        {authStatus && <NavBar />}
        <div class="col-8">
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/logout" element={<HandleLogout />} />
        </Routes>
        </div>
        {authStatus && <SuggestedUser />}
      </div>
    </div>
  )
}

export default App;
