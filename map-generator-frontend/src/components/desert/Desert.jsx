import { useEffect, useState } from "react";
import "./Desert.css";

export default function Desert() {
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="background-desert"></div>
      <div className={`page-fade-in ${isEntering ? "" : "hidden"}`}></div>
    </>
  );
}
