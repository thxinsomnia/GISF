import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [title, setTitle] = useState("");
  const fullTitle = "4th Artillery Battalion Information System";

  useEffect(() => {
    let i = 0;
    let interval;
    const startAnimation = () => {
      interval = setInterval(() => {
        setTitle(fullTitle.slice(0, i + 1));
        i++;
        if (i === fullTitle.length) {
          clearInterval(interval);
          setTimeout(() => {
            i = 0;
            startAnimation();
          }, 1000); // Wait 1s before repeating
        }
      }, 500);
    };
    startAnimation();
    return () => clearInterval(interval);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:6543/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.error || "Login failed.",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Token: " + data.access_token,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "An Error Occurred",
        text: err.message,
      });
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">{title}</h1>
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
