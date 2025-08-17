import { useEffect, useRef, useState } from "react";
import "./Grassland.css";
import Sidebar from "../itemsSidebar/ItemsSidebar";
import useDragAndDrop from "../../../hooks/dragAndDrop";
import {
  updateItem as update,
  deleteItem as remove,
} from "../../../utils/itemUtils";
import Item from "../item/Item";

export default function Grassland() {
  const [isEntering, setIsEntering] = useState(true);
  const [placedItems, setPlacedItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const containerRef = useRef(null);

  const { handleMouseDown } = useDragAndDrop(
    containerRef,
    placedItems,
    setPlacedItems,
    selectedItemId,
    setSelectedItemId
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, []);

  const allowDrop = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const json = e.dataTransfer.getData("application/json");
    const itemIndex = e.dataTransfer.getData("itemIndex");

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (json) {
      const itemData = JSON.parse(json);
      const newItem = {
        ...itemData,
        x,
        y,
        id: Date.now(),
        size: 60,
        rotation: 0,
      };
      setPlacedItems((prev) => [...prev, newItem]);
    } else if (itemIndex) {
      setPlacedItems((prev) =>
        prev.map((item, i) => (i == itemIndex ? { ...item, x, y } : item))
      );
    }
  };

  const updateItem = (id, updates) => {
    setPlacedItems((prev) => update(prev, id, updates));
  };

  const deleteItem = (id) => {
    setPlacedItems((prev) => remove(prev, id));
    setSelectedItemId(null);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="background-grassland"
        onDrop={handleDrop}
        onDragOver={allowDrop}
        onMouseDown={(e) => {
          if (!e.target.closest(".dropped-wrapper")) {
            setSelectedItemId(null);
          }
        }}
      >
        <Sidebar />
        {placedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            isSelected={selectedItemId === item.id}
            onMouseDown={handleMouseDown}
            updateItem={updateItem}
            deleteItem={deleteItem}
          />
        ))}
      </div>
      <div className={`page-fade-in ${isEntering ? "" : "hidden"}`}></div>
    </>
  );
}
