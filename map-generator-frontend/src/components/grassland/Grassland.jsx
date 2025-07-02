import { useEffect, useState } from "react";
import "./Grassland.css";

export default function Grassland() {
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="background-grassland"></div>
      <div className={`page-fade-in ${isEntering ? "" : "hidden"}`}></div>
    </>
  );
}
