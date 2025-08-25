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
import Profile from "./components/user/profile/Profile";
import PostsPage from "./components/posts/PostsPage";
import PostPage from "./components/postPage/PostPage";
import UserProvider from "./providers/UserProvider";
import GuestGuard from "./guards/GuestRouter";
import AuthGuard from "./guards/AuthGuard";

function App() {
  return (
    <UserProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/biomes" element={<Biomes />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/post/nesh" element={<PostPage />} />

        <Route element={<AuthGuard />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/biomes/grassland" element={<Grassland />} />
          <Route path="/biomes/desert" element={<Desert />} />
          <Route path="/biomes/tundra" element={<Tundra />} />
        </Route>

        <Route element={<GuestGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
