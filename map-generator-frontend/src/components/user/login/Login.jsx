import { Link, useNavigate } from "react-router";
import "./Login.css";
import { useState, useEffect, useActionState } from "react";
import { useLogin } from "../../../api/authApi";
import { useUserContext } from "../../../context/UserContext";

export default function Login() {
  const [isEntering, setIsEntering] = useState(true);
  const { login } = useLogin();
  const { userLoginHandler } = useUserContext();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const navigate = useNavigate();

  const loginHandler = async (_, formData) => {
    setErrors({ email: "", password: "", general: "" });

    const values = Object.fromEntries(formData);

    if (!values.email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }
    if (!values.password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }
    try {
      const authData = await login(values.email, values.password);

      if (!authData || !authData.accessToken || !authData.User?._id) {
        throw new Error("Invalid email or password. Please try again.");
      }

      const formattedAuthData = {
        ...authData.User,
        accessToken: authData.accessToken,
        userId: authData.User._id,
      };

      userLoginHandler(formattedAuthData);
      navigate(-1);
    } catch (error) {
      console.error("Login Error:", error.message || "Something went wrong");
      setErrors((prev) => ({
        ...prev,
        general: error.message || "Something went wrong. Please try again.",
      }));
    }
  };

  const [_, loginAction, isPending] = useActionState(loginHandler, {
    email: "",
    password: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="background-login">
      <div className="left-panel"></div>
      <div className="login-card">
        <h2>Login</h2>
        <form action={loginAction} className="login-form">
          <div className="login-input-container">
            <input type="email" placeholder="Email" name="email" id="email" />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="login-input-container">
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="loginButton"
            value="Login"
            disabled={isPending}
          >
            Sign in
          </button>

          {errors.general && (
            <p className="error-message general-error">{errors.general}</p>
          )}
        </form>
        <p className="login-footer">
          Need an account? Sign up{" "}
          <Link to="/register" className="register-link">
            here
          </Link>
        </p>
      </div>
      <div className={`page-fade-in ${isEntering ? "" : "hidden"}`}></div>
    </div>
  );
}
