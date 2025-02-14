import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const PostTweet = () => {
  const [formData, setFormData] = useState({
    text: "",
  });

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
      const response = await axios.post("http://localhost:5000/api/posts/create", formData, {
        withCredentials: true,
      });

      //const { username, email } = response.data;

      alert("Tweet posted successfully");

      navigate("/"); // Redirect to Homepage
    } catch (err) {
      setError(err.response?.data?.message || "tweet failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <p className="error">{error}</p>}
      <div>
        <label>Tweet Something:</label>
        <input type="text" name="text" value={formData.text} onChange={handleChange} required />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Posting" : "Tweet"}
      </button>
    </form>
  );
};

export default PostTweet;