import { Routes, Route } from "react-router";
import "./App.css";
import Home from "./components/home/HomePage";
import Biomes from "./components/catalog/BiomesPage";
import Grassland from "./components/biomes/grassland/Grassland";
import Desert from "./components/biomes/desert/Desert";
import Tundra from "./components/biomes/tundra/Tundra";
import Navigation from "./components/navigation/Navigation";
import Login from "./components/user/login/Login";
import Register from "./components/user/register/register";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/biomes" element={<Biomes />} />
        <Route path="/biomes/grassland" element={<Grassland />} />
        <Route path="/biomes/desert" element={<Desert />} />
        <Route path="/biomes/tundra" element={<Tundra />} />
      </Routes>
    </>
  );
}

export default App;
