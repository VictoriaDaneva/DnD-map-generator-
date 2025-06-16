import { Link } from "react-router";
import "./HomePage.css";

export default function Home() {
    return(
         <>
      <div className="background-home">
        <div className="home-overlay">
          <h1>
            Welcome to DnD map generator.
            <br />Perfect for Game Masters.
          </h1>
          <p>You can start your map by clicking the button below!</p>
          <Link to="/biomes">
            <button className="home-cta-button">Start</button>
          </Link>
        </div>
      </div>
    </>
    )
   
}