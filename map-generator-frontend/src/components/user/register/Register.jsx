import { Link, useNavigate } from "react-router";
import "./Register.css";
import { useState, useEffect } from "react";
import { useRegister } from "../../../api/authApi";
import { useUserContext } from "../../../context/UserContext";

export default function Register() {
  const [isEntering, setIsEntering] = useState(true);
  const navigate = useNavigate();
  const { register } = useRegister();
  const { userLoginHandler } = useUserContext();
  const [errors, setErrors] = useState({});

  const registerHandler = async (event) => {
    event.preventDefault();
    setErrors({});

    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    const { username, email, phoneNumber, imageUrl, address, password } =
      values;
    console.log({ username, email, phoneNumber, imageUrl, address, password });

    const confirmPassword = values["confirm-password"];

    let newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!imageUrl) newErrors.imageUrl = "Profile image URL is required";
    if (!address) newErrors.address = "Address is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm your password";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const authData = await register(
        username,
        email,
        phoneNumber,
        imageUrl,
        address,
        password
      );

      if (!authData || !authData.accessToken || !authData.User?._id) {
        throw new Error("Registration failed. Please try again.");
      }

      const formattedAuthData = {
        ...authData.User,
        accessToken: authData.accessToken,
        userId: authData.User._id,
      };

      userLoginHandler(formattedAuthData);
      navigate("/");
    } catch (error) {
      console.error(
        "Registration Error:",
        error.message || "Something went wrong"
      );

      setErrors({
        general: error.message || "Something went wrong. Please try again.",
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="background-register">
      <div className="left-panel"></div>
      <div className="register-card">
        <h2>Register</h2>
        <form onSubmit={registerHandler} className="register-form">
          <div className="register-input-container">
            <input
              type="username"
              placeholder="Username"
              name="username"
              id="username"
            />
            {errors.username && (
              <p className="error-message">{errors.username}</p>
            )}
            <input type="email" placeholder="Email" name="email" id="email" />
            {errors.email && <p className="error-message">{errors.email}</p>}

            <input
              type="tel"
              placeholder="Phone Number"
              name="phoneNumber"
              id="phoneNumber"
            />
            {errors.phoneNumber && (
              <p className="error-message">{errors.phoneNumber}</p>
            )}
            <input type="text" placeholder="Image URL" name="imageUrl" />
            {errors.imageUrl && (
              <p className="error-message">{errors.imageUrl}</p>
            )}
            <input type="text" placeholder="Address" name="address" />
            {errors.address && (
              <p className="error-message">{errors.address}</p>
            )}
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
            <input
              type="password"
              placeholder="Repeat Password"
              name="confirm-password"
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
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
