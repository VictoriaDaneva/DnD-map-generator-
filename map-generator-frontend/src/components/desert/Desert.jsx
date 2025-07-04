import { useEffect, useState } from "react";
import "./Desert.css";
import Sidebar from "../itemsSidebar/ItemsSidebar";

export default function Desert() {
  const [isEntering, setIsEntering] = useState(true);
  const [placedItems, setPlacedItems] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    const itemData = JSON.parse(e.dataTransfer.getData("application/json"));
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newItem = {
      ...itemData,
      x,
      y,
      id: Date.now(),
    };
    setPlacedItems((prev) => [...prev, newItem]);
  };

  const allowDrop = (e) => e.preventDefault();

  return (
    <>
      <div
        className="background-desert"
        onDrop={handleDrop}
        onDragOver={allowDrop}
      >
        <Sidebar />
        {placedItems.map((item) => (
          <img
            key={item.id}
            src={item.src}
            alt={item.name}
            className="dropped-item"
            style={{ left: item.x, top: item.y }}
          />
        ))}
      </div>
      <div className={`page-fade-in ${isEntering ? "" : "hidden"}`}></div>
    </>
  );
}
