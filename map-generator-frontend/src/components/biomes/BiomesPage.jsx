import { Link } from "react-router";
import { useEffect, useState } from "react";
import "./BiomesPage.css";

export default function Biomes() {
  const [hoveredBiome, setHoveredBiome] = useState(null);
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 30); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={`biomes-background ${hoveredBiome || ""}`}>
        <div className="biomes-overlay">
          <h1>Select your biome:</h1>
          <div className="biomes-grid">
            {hoveredBiome === "bg-grassland" && (
  <img src="/green-vanes.png" className="biome-fullscreen-deco deco-grassland" alt="grassland-deco" />
)}
{hoveredBiome === "bg-desert" && (
  <img src="/sand-lilies.png" className="biome-fullscreen-deco deco-desert" alt="desert-deco" />
)}
{hoveredBiome === "bg-tundra" && (
  <img src="/tundra-flowers.png" className="biome-fullscreen-deco deco-tundra" alt="tundra-deco" />
)}
            <article
              className="biome-card grassland"
              onMouseEnter={() => setHoveredBiome("bg-grassland")}
              onMouseLeave={() => setHoveredBiome(null)}
            >
              <img src="/grassland.webp" className="biome-image" />
              <div className="biome-details">
                <h2 className="biome-name">Grassland</h2>
                <p className="biome-description">
                  An area where the vegetation is dominated by grasses and one of the largest biomes. However, sedge and rush can also be found along with variable proportions of legumes such as clover, and other herbs.
                </p>
                <button className="selectBiome-button grassland-btn">Select</button>
              </div>
            </article>

            <article
              className="biome-card desert"
              onMouseEnter={() => setHoveredBiome("bg-desert")}
              onMouseLeave={() => setHoveredBiome(null)}
            >
              <img src="/desert.jpg" className="biome-image" />
              <div className="biome-details">
                <h2 className="biome-name">Desert</h2>
                <p className="biome-description">
                  A landscape where little precipitation occurs and, consequently, living conditions create unique biomes and ecosystems. The lack of vegetation exposes the unprotected surface of the ground to denudation.
                </p>
                <button className="selectBiome-button desert-btn">Select</button>
              </div>
            </article>

            <article
              className="biome-card tundra"
              onMouseEnter={() => setHoveredBiome("bg-tundra")}
              onMouseLeave={() => setHoveredBiome(null)}
            >
              <img src="/tundra.jpg" className="biome-image" />
              <div className="biome-details">
                <h2 className="biome-name">Tundra</h2>
                <p className="biome-description">
                  A type of biome where tree growth is hindered by frigid temperatures and short growing seasons. Tundra vegetation is composed of dwarf shrubs, sedges, grasses, mosses, and lichens.
                </p>
                <button className="selectBiome-button tundra-btn">Select</button>
              </div>
            </article>
          </div>
        </div>
      </div>

      <div className={`page-fade-in ${isEntering ? "" : "hidden"}`}></div>
    </>
  );
}