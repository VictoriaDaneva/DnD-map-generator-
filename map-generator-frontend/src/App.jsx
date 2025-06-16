
import { Routes, Route } from "react-router";
import './App.css'
import Home from "./components/home/HomePage";
import Biomes from "./components/biomes/BiomesPage";

function App() {
  return(
    
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/biomes" element={<Biomes />}/>
      </Routes>
    
  )
  
}

export default App
