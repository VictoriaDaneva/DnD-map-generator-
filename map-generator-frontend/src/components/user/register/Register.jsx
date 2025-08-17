import { Link } from "react-router";
import "./Register.css";
import { useState, useEffect } from "react";

export default function Register() {
  const [isEntering, setIsEntering] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="background-register">
      <div className="left-panel"></div>
      <div className="register-card">
        <h2>Register</h2>
        <form className="register-form">
          <div className="register-input-container">
            <input type="email" placeholder="Email" name="email" id="email" />
            <input
              type="firstName"
              placeholder="First Name"
              name="firstName"
              id="firstName"
            />
            <input
              type="lastName"
              placeholder="Last Name"
              name="lastName"
              id="lastName"
            />
            <input
              type="phoneNumber"
              placeholder="Phone Number"
              name="phoneNumber"
              id="phoneNumber"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
            />
          </div>

          <button type="submit" className="registerButton" value="Regsiter">
            Sign in
          </button>
        </form>
        <p className="regsiter-footer">
          Already have an account? Login{" "}
          <Link to="/login" className="login-link">
            here
          </Link>
        </p>
      </div>
      <div className={`page-fade-in ${isEntering ? "" : "hidden"}`}></div>
    </div>
  );
}
