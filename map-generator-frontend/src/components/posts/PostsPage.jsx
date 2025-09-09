import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import "./PostsPage.css";
import { getMaps } from "../../api/mapApi";

export default function PostsPage() {
  const [filter, setFilter] = useState("all");
  const [maps, setMaps] = useState([]);

  useEffect(() => {
    async function fetchMaps() {
      const allMaps = await getMaps();
      setMaps(allMaps);
    }
    fetchMaps();
  }, []);

  const filteredMaps =
    filter === "all" ? maps : maps.filter((map) => map.biome === filter);

  console.log(maps);

  return (
    <div className="posts-page">
      <div className="category-bar">
        {["all", "desert", "tundra", "grassland"].map((category) => (
          <button
            key={category}
            className={`category-btn ${filter === category ? "active" : ""}`}
            onClick={() => setFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid-posts-container">
        {filteredMaps.map((map) => (
          <Link key={map._id} to={`/post/${map._id}`} className="card">
            <img
              src={map.image}
              alt={map.title}
              className="map-background"
              onLoad={(e) => {
                map._originalWidth = e.target.naturalWidth;
                map._originalHeight = e.target.naturalHeight;
              }}
            />

            {map.items?.map((item) => {
              const naturalWidth = map._naturalWidth || 800;
              const naturalHeight = map._naturalHeight || 600;

              const previewWidth = 280;
              const previewHeight = 200;

              const scaleX = previewWidth / naturalWidth;
              const scaleY = previewHeight / naturalHeight;

              return (
                <img
                  key={item._id}
                  src={`/${item.name}.png`}
                  alt={item.name}
                  className="map-item"
                  style={{
                    left: `${item.x * scaleX}px`,
                    top: `${item.y * scaleY}px`,
                    width: `${item.size * scaleX}px`,
                    transform: `rotate(${item.rotation}deg)`,
                  }}
                />
              );
            })}
            <div className="overlay">
              <h3>{map.title}</h3>
              <p>By {map.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
