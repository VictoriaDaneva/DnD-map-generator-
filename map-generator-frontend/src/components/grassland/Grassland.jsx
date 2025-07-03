import { useEffect, useState } from "react";
import "./Grassland.css";
import Sidebar from "../itemsSidebar/ItemsSidebar";

export default function Grassland() {
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="background-grassland">
        <Sidebar />
      </div>
      <div className={`page-fade-in ${isEntering ? "" : "hidden"}`}></div>
    </>
  );
}
