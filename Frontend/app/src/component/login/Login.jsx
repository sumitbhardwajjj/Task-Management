import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import { Bounce, ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "", // Clear validation errors when the input changes
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    // Password validation using custom regex
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, one digit, and one special character";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {

      setLoading(true);
      
      const response = await axios.post(
        "https://tasks-api-vwnm.onrender.com/user/login",
        formData
      );

      if (response.data === "not") {
        toast.error("User does not exist");
      } else {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error.response.data || error.message);
    }
  };

  return (
    <div className="login-form">
       {loading && <p>Loading...</p>}
      <form className="form" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <span className="error">{errors.password}</span>}
        <Link className="lin" to="/signup">
          <div>
            New user? <span>Register</span>
          </div>
        </Link>
        <button className="Button" type="submit">
          Login
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default Login;
