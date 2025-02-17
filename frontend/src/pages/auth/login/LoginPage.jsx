import { useState } from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const handleClick = async (e) => {
        navigate("/signup");
    };
    return (
        <div className="login-page">
            <LoginForm />
        
            <div>
                Don't have an account? <href onClick={handleClick}>Sign in</href>
            </div>
        </div>
        
    );
};

export default LoginPage;