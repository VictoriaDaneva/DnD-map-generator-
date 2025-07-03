import { useEffect, useState } from "react";
import "./Tundra.css";
import Sidebar from "../itemsSidebar/ItemsSidebar";

export default function Tundra() {
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="background-tundra">
        <Sidebar />
      </div>
      <div className={`page-fade-in ${isEntering ? "" : "hidden"}`}></div>
    </>
  );
}
