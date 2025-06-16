import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./HomePage.css";

export default function Home() {
  const [hoveredSubmit, setHoveredSubmit] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setIsFading(true); 
    setTimeout(() => {
      navigate("/biomes");
    }, 700); 
  };

  return (
    <div className={`background-home ${hoveredSubmit ? "bg-tint" : ""}`}>
      <div className="home-overlay">
        <h1>
          Welcome to DnD map generator.
          <br />Perfect for Game Masters.
        </h1>
        <p>You can start your map by clicking the button below!</p>
        <button
          className="home-cta-button"
          onMouseEnter={() => setHoveredSubmit(true)}
          onMouseLeave={() => setHoveredSubmit(false)}
          onClick={handleStart}
        >
          Start
        </button>
      </div>

      <div className={`fade-overlay ${isFading ? "active" : ""}`}></div>
    </div>
  );
}