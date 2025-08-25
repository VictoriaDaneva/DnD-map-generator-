import { Link } from "react-router";
import "./Navigation.css";
import useAuth from "../../hooks/useAuth";

export default function Navigation() {
  const { isAuthenticated } = useAuth();
  return (
    <nav className="navigationBar">
      <div className="left-side">
        {isAuthenticated ? (
          <Link className="profile" to="/profile">
            <img src="/profile-icon.png" alt="profile-icon" />
          </Link>
        ) : (
          ``
        )}

        <Link className="profile" to="/">
          <span>Home</span>
        </Link>
        <Link className="posts" to="/posts">
          <span>Posts</span>
        </Link>
      </div>

      <div className="right-side">
        {isAuthenticated ? (
          <Link className="logout" to="/logout">
            <span>Logout</span>
          </Link>
        ) : (
          <Link className="login" to="/login">
            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
