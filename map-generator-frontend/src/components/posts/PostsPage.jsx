import React, { useState } from "react";
import { Link } from "react-router";
import "./PostsPage.css";

const maps = [
  {
    id: 1,
    title: "Sands of Eternity",
    type: "desert",
    img: "/tundra-biome.png",
    author: "Viktoria",
  },
  {
    id: 2,
    title: "Frozen Wastes",
    type: "tundra",
    img: "/register.jpg",
    author: "DM_Arctic",
  },
  {
    id: 3,
    title: "Emerald Plains",
    type: "grassland",
    img: "/login.jpg",
    author: "MapMaker42",
  },
  {
    id: 4,
    title: "Lost Jungle",
    type: "grassland",
    img: "/login2.jpg",
    author: "ExplorerX",
  },
  {
    id: 5,
    title: "Sands of Eternity",
    type: "desert",
    img: "/tundra-biome.png",
    author: "Viktoria",
  },
  {
    id: 6,
    title: "Frozen Wastes",
    type: "tundra",
    img: "/register.jpg",
    author: "DM_Arctic",
  },
  {
    id: 7,
    title: "Emerald Plains",
    type: "grassland",
    img: "/login.jpg",
    author: "MapMaker42",
  },
  {
    id: 8,
    title: "Lost Jungle",
    type: "grassland",
    img: "/login2.jpg",
    author: "ExplorerX",
  },
];

export default function PostsPage() {
  const [filter, setFilter] = useState("all");

  const filteredMaps =
    filter === "all" ? maps : maps.filter((map) => map.type === filter);

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
          <Link key={map.id} to={`/post/nesh`} className="card">
            <img src={map.img} alt={map.title} />
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
