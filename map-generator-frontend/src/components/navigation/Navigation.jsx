import { Link } from "react-router";
import "./Navigation.css";

export default function Navigation() {
  return (
    <nav className="navigationBar">
      <div className="left-side">
        <Link className="profile" to="/profile">
          <img src="/profile-icon.png" alt="profile-icon" />
        </Link>
        <Link className="profile" to="/">
          <span>Home</span>
        </Link>
        <Link className="posts" to="/posts">
          <span>Posts</span>
        </Link>
      </div>

      <div className="right-side">
        <Link className="login" to="/login">
          <span>Login</span>
        </Link>
        <Link className="logout" to="/logout">
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}
