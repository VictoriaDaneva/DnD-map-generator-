import { Routes, Route } from "react-router";
import "./App.css";
import Home from "./components/home/HomePage";
import Biomes from "./components/biomes/BiomesPage";
import Grassland from "./components/grassland/Grassland";
import Desert from "./components/desert/Desert";
import Tundra from "./components/tundra/Tundra";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/biomes" element={<Biomes />} />
      <Route path="/biomes/grassland" element={<Grassland />} />
      <Route path="/biomes/desert" element={<Desert />} />
      <Route path="/biomes/tundra" element={<Tundra />} />
    </Routes>
  );
}

export default App;
