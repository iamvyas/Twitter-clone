import { useState , useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../GlobalContext";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    password: "",
    email: "",

  });

  let {authStatus, authStatusLoader} = useContext(GlobalContext);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For redirection

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData, {
        withCredentials: true,
      });

      const { username, email } = response.data;
      authStatusLoader(true);
      // Save user info in localStorage
      //localStorage.setItem("user", JSON.stringify({ username, email }));

      //alert(`Login successful!\nUsername: ${username}\nEmail: ${email}`);

      navigate("/"); // Redirect to Homepage
    } catch (err) {
      setError(err.response?.data?.message || "signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
      </div>
      <div>
        <label>full name:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <div>
        <label>email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

export default SignUpForm;