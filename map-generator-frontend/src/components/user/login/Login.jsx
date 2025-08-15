import { Link } from "react-router";
import "./Login.css";
import { useState, useEffect } from "react";

export default function Login() {
  const [isEntering, setIsEntering] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="background-login">
      <div className="left-panel"></div>
      <div className="login-card">
        <h2>Login</h2>
        <form className="login-form">
          <div className="login-input-container">
            <input type="email" placeholder="Email" name="email" id="email" />
          </div>

          <div className="login-input-container">
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
            />
          </div>

          <button type="submit" className="loginButton" value="Login">
            Sign in
          </button>
        </form>
        <p className="login-footer">
          Need an account? Sign up{" "}
          <Link to="/register" className="login-link">
            here
          </Link>
        </p>
      </div>
      <div className={`page-fade-in ${isEntering ? "" : "hidden"}`}></div>
    </div>
  );
}
