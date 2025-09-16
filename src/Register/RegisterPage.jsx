import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

function RegisterPage() {

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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:6543/aktivasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.error || "An error occurred during registration.",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "Please login.",
        }).then(() => {
          window.location.href = "/login";
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
    <div className="register-container">
      <h1 className="title">{title}</h1>
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
